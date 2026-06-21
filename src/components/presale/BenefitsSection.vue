<script setup lang="ts">
const benefits = [
  {
    icon: 'fa-solid fa-heart-pulse',
    title: 'Acompañamiento real',
    description: 'Seguimiento directo de Luisa y su equipo para que nunca te sientas sola en el proceso.',
  },
  {
    icon: 'fa-solid fa-dumbbell',
    title: 'Entrenamientos efectivos',
    description: 'Rutinas diseñadas para mujeres ocupadas, en casa o gimnasio, sin excusas.',
  },
  {
    icon: 'fa-solid fa-carrot',
    title: 'Nutrición sin restricciones',
    description: 'Aprende a comer mejor sin dietas extremas ni contar cada caloría.',
  },
  {
    icon: 'fa-solid fa-users',
    title: 'Comunidad privada',
    description: 'Rodéate de mujeres con metas similares que empujan en la misma dirección.',
  },
  {
    icon: 'fa-solid fa-mobile-screen',
    title: 'App y contenido exclusivo',
    description: 'Acceso a videos, guías y recursos solo para miembros de la comunidad.',
  },
  {
    icon: 'fa-solid fa-gift',
    title: 'Precio de preventa',
    description: 'Asegura tu cupo con el valor promocional antes de que cierre la convocatoria.',
  },
]
</script>

<template>
  <section id="beneficios" class="benefits">
    <div class="benefits__inner">
      <span class="eyebrow eyebrow--green">¿Qué incluye?</span>
      <h2 class="benefits__title display-lg">Todo lo que necesitas para transformarte</h2>

      <div class="benefits__grid">
        <article v-for="benefit in benefits" :key="benefit.title" class="benefit-card">
          <div class="benefit-card__icon">
            <i :class="benefit.icon" />
          </div>
          <h3 class="benefit-card__title">{{ benefit.title }}</h3>
          <p class="benefit-card__description">{{ benefit.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.benefits {
  padding-block: clamp(5rem, 12vw, 9rem);
  padding-inline: clamp(2.5rem, 9vw, 9rem);
  background: $lpb-white;
}

.benefits__inner {
  max-width: 1200px;
  margin-inline: auto;
  text-align: center;
}

.benefits__title {
  margin: 0.75rem 0 3rem;
  color: $lpb-black;
}

.benefits__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  text-align: left;
}

.benefit-card {
  background: $lpb-paper;
  border: 1px solid rgba($lpb-black, 0.05);
  border-radius: 1.25rem;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 50px rgba($lpb-black, 0.06);
  }
}

.benefit-card__icon {
  width: 2.75rem;
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba($lpb-green, 0.1);
  color: $lpb-green-dark;
  font-size: 1.1rem;
}

.benefit-card__title {
  font-family: $font-display;
  font-size: 1.25rem;
  font-weight: 400;
  margin: 0;
  color: $lpb-black;
}

.benefit-card__description {
  font-family: $font-sans;
  font-size: 0.95rem;
  line-height: 1.55;
  color: $lpb-muted;
  margin: 0;
}
</style>
