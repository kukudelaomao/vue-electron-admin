<template>
  <div>文章管理</div>
</template>
<script>
export default {
  mounted() {
    this.http.postDev(this.protocol.param_getArticleList).then(res => {
      const { code, message, value } = res.data
      console.log(code)
      console.log(message)
      console.log(value)
    })
  }
}
</script>
