
// 指令 vFocus 可以在模板中以 v-focus 的形式使用
export const vFocus = {

  /* 在绑定元素的 attribute 前或事件监听器应用前调用 */
  // created: (el, binding, vnode, prevVnode) => {},

  /* 在元素被插入到 DOM 前调用 */
  // beforeMount: (el, binding, vnode, prevVnode) => {},

  /* 在绑定元素的父组件和及他自己的所有子节点都挂载完成后调用 */
  mounted: (el: HTMLElement) => el.focus(),

  /* 绑定元素的父组件更新前调用 */
  // beforeUpdate(el, binding, vnode, prevVnode) {},

  /* 在绑定元素的父组件及他自己的所有子节点都更新后调用 */
  // updated(el, binding, vnode, prevVnode) {},

  /* 绑定元素的父组件卸载前调用 */
  // beforeUnmount(el, binding, vnode, prevVnode) {},

  /* 绑定元素的父组件卸载后调用 */
  // unmounted(el, binding, vnode, prevVnode) {}

  /** 指令钩子传递参数
   * - el: 指令绑定到的元素。可以用于直接操作 DOM。
   * - binding: 一个对象，包含以下属性：
   *    value：传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
   *    oldValue：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
   *    arg：传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。
   *    modifiers：一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
   *    instance：使用该指令的组件实例。
   *    dir：指令的定义对象。
   * - vnode：代表绑定元素的底层 VNode。
   * - prevNode：之前的渲染中代表指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用。
   * 
   * 除了 el 外，其它参数都是只读的，不要更改它们。
  */
}

// 在 <script setup> 中，任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令。

// 在没有使用 <script setup> 的情况下，自定义指令需要通过 directives 选项注册。

// 简化形式：仅仅需要在 mounted 和 updated 上实现相同的行为，除此之外并不需要其他钩子。
/* app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
}) */

// 指令可以传递多个值

// <div v-demo="{ color: 'white', text: 'hello!' }"></div>
/*
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
 */

// 当在组件上使用自定义指令时，它会始终应用于组件的根节点，和透传 attributes 类似。

/* 需要注意的是组件可能含有多个根节点。
  当应用到一个多根组件时，指令将会被忽略且抛出一个警告。
  和 attribute 不同，指令不能通过 v-bind="$attrs" 来传递给一个不同的元素。
  总的来说，不推荐在组件上使用自定义指令。
*/