<template>
  <div>
    abc
    <h3>Nested draggable</h3>
    <!-- <nested-draggable :tasks="list" /> -->
    <draggable
      :list="list"
      :disabled="!enabled"
      class="list-group"
      ghost-class="ghost"
      :move="checkMove"
      @start="dragging = true"
      @end="dragging = false"
    >
      <div
        v-for="element in list"
        :key="element.name"
        class="list-group-item"
      >
        {{ element.name }}
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
// import nestedDraggable from 'vuedraggable'
export default {
  name: 'Nested',
  components: {
    draggable
    // nestedDraggable
  },
  data() {
    return {
      list: [
        {
          name: 'task 1',
          tasks: [
            {
              name: 'task 2',
              tasks: []
            }
          ]
        },
        {
          name: 'task 3',
          tasks: [
            {
              name: 'task 4',
              tasks: []
            }
          ]
        },
        {
          name: 'task 5',
          tasks: []
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
