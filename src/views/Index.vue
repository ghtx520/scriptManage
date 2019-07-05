<template>
    <div>
        <auto-header></auto-header>
        <router-view/>
    </div> 
</template>

<script>
    import AutoHeader from '@/components/Header'
    export default {
        components:{
            AutoHeader
        }
    }
</script>