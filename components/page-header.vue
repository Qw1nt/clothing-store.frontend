<script setup lang="ts">
interface Props {
    header: string;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="w-full h-14 bg-gray-100 mb-5 flex justify-center items-center">
        <div class="text-xl">
            {{props.header}}
        </div>
    </div>
</template>

<style scoped>

</style>