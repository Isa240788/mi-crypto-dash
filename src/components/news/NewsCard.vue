<template>
  <div class="card bg-base-100 shadow-sm border border-base-200 rounded-[32px] overflow-hidden hover:shadow-md transition-all group h-full flex flex-col">
    
    <!-- 🖼️ 1. LA IMAGEN SOLA (Con el Badge encima) -->
    <figure class="relative h-48 overflow-hidden shrink-0">
      <img 
        :src="news.imageUrl || 'https://images.unsplash.com'" 
        :alt="news.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <!-- El badge se queda aquí, es el único que flota -->
      <div class="absolute top-4 left-4">
        <span class="badge badge-primary font-black uppercase text-[9px] tracking-widest px-3 py-3 rounded-xl border-none shadow-lg">
          {{ news.category }}
        </span>
      </div>
    </figure>

    <!-- 📝 2. TODO EL TEXTO VA AQUÍ ABAJO (Ordenadito) -->
    <div class="card-body p-6 flex flex-col flex-grow">
      <!-- Fecha y Autor -->
      <div class="flex justify-between items-center mb-3">
        <span class="text-[9px] font-black opacity-30 uppercase tracking-tighter">👤 {{ news.author || 'Isidora S.' }}</span>
        <span class="text-[9px] font-black opacity-30 uppercase">📅 {{ formatDate(news.publishedAt) }}</span>
      </div>

      <!-- ✅ EL TÍTULO VA AQUÍ (Fuera del figure) -->
      <h3 class="text-lg font-black text-base-content leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-3">
        {{ news.title }}
      </h3>

      <p class="text-xs font-medium opacity-60 line-clamp-3 mb-6 flex-grow">
        {{ news.summary }}
      </p>

      <div class="card-actions justify-end mt-auto">
        <router-link 
          :to="{ name: 'news-detail', params: { id: news.id } }" 
          class="btn btn-neutral btn-sm rounded-xl font-black uppercase tracking-widest text-[9px] px-6 hover:btn-primary border-none shadow-lg"
        >
          Leer más ➜
        </router-link>
      </div>
    </div>
  </div>
</template>


<script setup>
defineProps({
  news: {
    type: Object,
    required: true
  }
})

// Formato chileno para que el profe vea su amada fecha regional
const formatDate = (date) => {
  if (!date) return 'Reciente'
  return new Date(date).toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<style scoped>
/* Para que el texto no se rompa y mantenga el orden visual */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
