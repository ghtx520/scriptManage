<template>
    <div>
       <p>正在重新加载，请稍后...</p>
    </div>
</template>

<script>
    export default {
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.$router.replace(from.fullPath)
            })
        }
    }
</script>