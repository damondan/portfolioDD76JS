<script lang="ts">
  import Mermaid from './Mermaid.svelte';
  
  const componentDiagramDef = `
  graph TB
     subgraph GH ["    GitHub Pages    "]
         PORT[Portfolio Website<br/>portfolioDD76JS] 
     end

     subgraph RH ["    Railway Hosting    "]
         subgraph SK ["  SvelteKit App (pdfdocsearch-sv-ts)  "]
             ST[store.js]
             A[SearchBar.svelte] --> B[+page.svelte]
             C[PdfBlock.svelte] --> B
             P[PdfBookResult.js] --> B
             ST --> A
             ST --> B
             
             subgraph "API Routes"
                 API1["api/searchquery/+server.ts"]
                 API2["api/pdf-titles/+server.ts"] 
                 API3["api/subjects/+server.ts"]
             end
             
             subgraph "Database Models"
                 H[db/models/book.ts]
                 I[db/models/page.ts]
                 CONN[db/mongodb.ts]
             end
         end
     end
 
     subgraph MA ["  MongoDB Atlas  "]
         SPACER1[ ]
         J[(Database<br/>books & pages collections)]
         SPACER2[ ]
     end
 
     subgraph SP ["Setup Process"]
         ADMIN[Admin runs:<br/>node scripts/import-pdfs.js]
         K[scripts/import-pdfs.js]
     end

     PORT --"User clicks link"--> B
     B --"Internal requests"--> API1
     B --"Internal requests"--> API2
     B --"Internal requests"--> API3
     API1 --> CONN
     API2 --> CONN
     API3 --> CONN
     CONN --> H
     CONN --> I
     H --"Queries"--> J
     I --"Queries"--> J
     ADMIN --> K
     K --"Imports PDF data"--> J

     %% Styling
     classDef githubPages fill:#90EE90,stroke:#333,stroke-width:3px,font-size:24px,font-weight:bold
     classDef railwayHosting fill:#4169E1,stroke:#333,stroke-width:3px,font-size:24px,color:#fff,font-weight:bold
     classDef svelteApp fill:#87CEEB,stroke:#333,stroke-width:3px,font-size:24px,font-weight:bold
     classDef mongoAtlas fill:#800080,stroke:#333,stroke-width:3px,font-size:24px,color:#fff,font-weight:bold
     classDef setupProcess fill:#FF4444,stroke:#333,stroke-width:3px,font-size:24px,color:#fff,font-weight:bold
     classDef invisible fill:transparent,stroke:transparent,color:transparent

     class GH githubPages
     class RH railwayHosting
     class SK svelteApp
     class MA mongoAtlas
     class SP setupProcess
     class SPACER1,SPACER2 invisible
  `;
</script>

<div class="w-full sm:w-2/3 mx-auto px-4">
  <div class="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg w-full min-h-[600px] sm:min-h-[700px] lg:min-h-[800px] max-w-none">
    <Mermaid definition={componentDiagramDef} type="component"/>
  </div>
</div>
