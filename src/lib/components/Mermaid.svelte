<script lang="ts">
    import { onMount } from "svelte";
    import mermaid from "mermaid";

    export let definition: string = "";
    export let type: "default" | "component" | "sequence" | "entity" = "default";
    export let config: Record<string, any> = {};

    let elementId: string = `mermaid-${Math.floor(Math.random() * 100000)}`;
    let containerDiv: HTMLDivElement | null = null;
    let panZoomContainer: HTMLDivElement | null = null;
    let isRendered: boolean = false;

    // Pan and zoom state
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    
    // Touch state
    let touches: Touch[] = [];
    let lastTouchDistance = 0;
    let lastTouchCenterX = 0;
    let lastTouchCenterY = 0;
    let isTouchPanning = false;
    let isTouchZooming = false;

    onMount(async () => {
        try {
            console.log('Mermaid component mounting with definition:', definition.substring(0, 100) + '...');
            
            // Render the Mermaid diagram
            mermaid.initialize({
                startOnLoad: false,
                theme: "default",
                securityLevel: "loose",
                flowchart: {
                    useMaxWidth: true,
                    htmlLabels: true
                },
                ...config,
            });

            const { svg } = await mermaid.render(elementId, definition);
            console.log('Mermaid rendering successful, SVG length:', svg.length);

            if (containerDiv) {
                containerDiv.innerHTML = svg;
                isRendered = true;
                console.log('SVG inserted into container');

                const svgElement = containerDiv.querySelector("svg");
                if (svgElement) {
                    console.log('SVG element found:', svgElement);
                    // Let SVG use its natural size but ensure visibility
                    svgElement.style.width = "100%";
                    svgElement.style.height = "auto";
                    svgElement.style.maxWidth = "100%";
                    svgElement.style.display = "block";
                    svgElement.style.margin = "0";
                    svgElement.style.minHeight = "300px";

                    // Get natural dimensions and adjust container
                    const bbox = svgElement.getBBox();
                    const naturalWidth = bbox.width;
                    const naturalHeight = bbox.height;

                    if (panZoomContainer) {
                        // Set container size to accommodate the diagram
                        const containerHeight = Math.max(naturalHeight + 100, 400);
                        panZoomContainer.style.height = `${Math.min(containerHeight, 800)}px`;
                        
                        // Center the diagram initially
                        const containerRect = panZoomContainer.getBoundingClientRect();
                        translateX = (containerRect.width - naturalWidth) / 2;
                        translateY = (containerRect.height - naturalHeight) / 2;
                        updateTransform();
                    }
                }
            }
        } catch (error) {
            console.error("Mermaid rendering error:", error);
            isRendered = true;
        }
    });

    // Transform functions
    function updateTransform() {
        if (containerDiv) {
            containerDiv.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
            containerDiv.style.transformOrigin = "top left";
        }
    }

    function zoomIn() {
        scale = Math.min(scale * 1.2, 5);
        updateTransform();
    }

    function zoomOut() {
        scale = Math.max(scale / 1.2, 0.2);
        updateTransform();
    }

    function resetZoom() {
        scale = 1;
        if (panZoomContainer && containerDiv) {
            const svgElement = containerDiv.querySelector("svg");
            if (svgElement) {
                const bbox = svgElement.getBBox();
                const containerRect = panZoomContainer.getBoundingClientRect();
                translateX = (containerRect.width - bbox.width) / 2;
                translateY = (containerRect.height - bbox.height) / 2;
            }
        }
        updateTransform();
    }

    function fitToWindow() {
        if (panZoomContainer && containerDiv) {
            const svgElement = containerDiv.querySelector("svg");
            if (svgElement) {
                const bbox = svgElement.getBBox();
                const containerRect = panZoomContainer.getBoundingClientRect();
                
                // Add more padding on mobile for better touch interaction
                const padding = window.innerWidth < 640 ? 60 : 40;
                const scaleX = (containerRect.width - padding) / bbox.width;
                const scaleY = (containerRect.height - padding) / bbox.height;
                
                // On mobile, allow slightly more scaling for better visibility
                const maxScale = window.innerWidth < 640 ? 1.2 : 1;
                scale = Math.min(scaleX, scaleY, maxScale);
                
                translateX = (containerRect.width - bbox.width * scale) / 2;
                translateY = (containerRect.height - bbox.height * scale) / 2;
                updateTransform();
            }
        }
    }

    // Mouse events for panning
    function handleMouseDown(event: MouseEvent) {
        isDragging = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
        if (panZoomContainer) {
            panZoomContainer.style.cursor = "grabbing";
        }
    }

    function handleMouseMove(event: MouseEvent) {
        if (isDragging) {
            const deltaX = event.clientX - lastMouseX;
            const deltaY = event.clientY - lastMouseY;
            
            translateX += deltaX;
            translateY += deltaY;
            
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
            
            updateTransform();
        }
    }

    function handleMouseUp() {
        isDragging = false;
        if (panZoomContainer) {
            panZoomContainer.style.cursor = "grab";
        }
    }

    function handleWheel(event: WheelEvent) {
        event.preventDefault();
        const delta = event.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.max(Math.min(scale * delta, 5), 0.2);
        
        // Zoom towards mouse position
        const rect = panZoomContainer?.getBoundingClientRect();
        if (rect) {
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            
            translateX = mouseX - (mouseX - translateX) * (newScale / scale);
            translateY = mouseY - (mouseY - translateY) * (newScale / scale);
        }
        
        scale = newScale;
        updateTransform();
    }

    function handleDoubleClick(event: MouseEvent) {
        const rect = panZoomContainer?.getBoundingClientRect();
        if (rect) {
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            
            const newScale = Math.min(scale * 1.5, 5);
            translateX = mouseX - (mouseX - translateX) * (newScale / scale);
            translateY = mouseY - (mouseY - translateY) * (newScale / scale);
            scale = newScale;
            updateTransform();
        }
    }
    
    // Touch helper functions
    function getTouchDistance(touch1: Touch, touch2: Touch): number {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    function getTouchCenter(touch1: Touch, touch2: Touch): { x: number, y: number } {
        return {
            x: (touch1.clientX + touch2.clientX) / 2,
            y: (touch1.clientY + touch2.clientY) / 2
        };
    }
    
    // Touch event handlers
    function handleTouchStart(event: TouchEvent) {
        event.preventDefault();
        touches = Array.from(event.touches);
        
        if (touches.length === 1) {
            // Single touch - start panning
            isTouchPanning = true;
            isTouchZooming = false;
            lastMouseX = touches[0].clientX;
            lastMouseY = touches[0].clientY;
            
            if (panZoomContainer) {
                panZoomContainer.style.cursor = "grabbing";
            }
        } else if (touches.length === 2) {
            // Two touches - start zooming
            isTouchPanning = false;
            isTouchZooming = true;
            
            lastTouchDistance = getTouchDistance(touches[0], touches[1]);
            const center = getTouchCenter(touches[0], touches[1]);
            const rect = panZoomContainer?.getBoundingClientRect();
            
            if (rect) {
                lastTouchCenterX = center.x - rect.left;
                lastTouchCenterY = center.y - rect.top;
            }
        }
    }
    
    function handleTouchMove(event: TouchEvent) {
        event.preventDefault();
        touches = Array.from(event.touches);
        
        if (touches.length === 1 && isTouchPanning) {
            // Single touch panning
            const deltaX = touches[0].clientX - lastMouseX;
            const deltaY = touches[0].clientY - lastMouseY;
            
            translateX += deltaX;
            translateY += deltaY;
            
            lastMouseX = touches[0].clientX;
            lastMouseY = touches[0].clientY;
            
            updateTransform();
        } else if (touches.length === 2 && isTouchZooming) {
            // Two-finger pinch zoom
            const currentDistance = getTouchDistance(touches[0], touches[1]);
            const distanceRatio = currentDistance / lastTouchDistance;
            
            const newScale = Math.max(Math.min(scale * distanceRatio, 5), 0.2);
            
            // Zoom towards the center of the two touches
            const center = getTouchCenter(touches[0], touches[1]);
            const rect = panZoomContainer?.getBoundingClientRect();
            
            if (rect) {
                const touchCenterX = center.x - rect.left;
                const touchCenterY = center.y - rect.top;
                
                translateX = touchCenterX - (touchCenterX - translateX) * (newScale / scale);
                translateY = touchCenterY - (touchCenterY - translateY) * (newScale / scale);
            }
            
            scale = newScale;
            lastTouchDistance = currentDistance;
            updateTransform();
        }
    }
    
    function handleTouchEnd(event: TouchEvent) {
        event.preventDefault();
        touches = Array.from(event.touches);
        
        if (touches.length === 0) {
            // All touches ended
            isTouchPanning = false;
            isTouchZooming = false;
            
            if (panZoomContainer) {
                panZoomContainer.style.cursor = "grab";
            }
        } else if (touches.length === 1 && isTouchZooming) {
            // Went from two touches to one - switch to panning
            isTouchZooming = false;
            isTouchPanning = true;
            lastMouseX = touches[0].clientX;
            lastMouseY = touches[0].clientY;
        }
    }
</script>

<div class="w-full min-h-[600px] sm:min-h-[700px] lg:min-h-[800px] mb-5">
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div 
        bind:this={panZoomContainer}
        class="w-full min-h-[600px] sm:min-h-[700px] lg:min-h-[800px] max-h-[1000px] border-2 border-gray-300 
        rounded-lg bg-gray-50 relative overflow-hidden cursor-grab select-none focus:outline-2
        focus:outline-blue-500 focus:outline-offset-2"
        style="touch-action: none;"
        on:mousedown={handleMouseDown}
        on:mousemove={handleMouseMove}
        on:mouseup={handleMouseUp}
        on:mouseleave={handleMouseUp}
        on:wheel={handleWheel}
        on:dblclick={handleDoubleClick}
        on:touchstart={handleTouchStart}
        on:touchmove={handleTouchMove}
        on:touchend={handleTouchEnd}
        on:touchcancel={handleTouchEnd}
        role="img"
        tabindex="0"
        aria-label="Interactive diagram - use mouse to pan and zoom, or touch gestures on mobile"
    >
        <!-- Control Panel -->
        <div class="absolute top-2.5 right-2.5 z-50 flex gap-1 bg-white/95 p-2 rounded-md shadow-lg border border-black/10">
            <button on:click={zoomIn} class="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded bg-white cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:border-gray-600 hover:-translate-y-px active:translate-y-0">
                Zoom In
            </button>
            <button on:click={zoomOut} class="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded bg-white cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:border-gray-600 hover:-translate-y-px active:translate-y-0">
                Zoom Out
            </button>
            <button on:click={resetZoom} class="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded bg-white cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:border-gray-600 hover:-translate-y-px active:translate-y-0">
                Reset
            </button>
            <button on:click={fitToWindow} class="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded bg-white cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:border-gray-600 hover:-translate-y-px active:translate-y-0">
                Fit
            </button>
        </div>

        <!-- Help Text -->
        <div class="absolute bottom-2.5 left-2.5 z-50 bg-black/80 text-white px-3 py-1.5 text-xs rounded font-medium max-w-xs">
            <span class="hidden sm:inline">Double-click to zoom • Mouse wheel to zoom • Click & drag to pan</span>
            <span class="sm:hidden">Pinch to zoom • Touch & drag to pan</span>
        </div>

        <!-- Mermaid Content -->
        <div class="w-full h-full relative p-5">
            {#if !isRendered}
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 italic text-gray-600 z-25 text-base">Loading diagram...</div>
            {/if}
            <div bind:this={containerDiv} class="w-full min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]"></div>
        </div>
    </div>
</div>

