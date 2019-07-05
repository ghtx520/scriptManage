<template>
   <div class="pro-list">

   </div>
</template>

<script>
   export default{
       methods: {
           onLoad(){
               let _this = this;
               this.$api.project.projectList()
           }
       }
   }
</script>