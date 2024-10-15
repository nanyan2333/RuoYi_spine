<template>


</template>

<script setup>

const props = defineProps({
    recordList:{
        type:Array,
        required:true
    }
})
const emits = defineEmits(['close'])
const backFatherNode = () => {
    emits("close",false)
}
</script>

