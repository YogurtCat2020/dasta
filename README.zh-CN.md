# 刀削面（Dasta）

一个用于面向切面 Vue 组件开发的包。

刀削面（Dasta，Pasta 首字母改成 D）是基于 TypeScript 开发的，用于将 Vue 组件对象中重复的代码独立出来封装成装饰器，以提高代码的可复用性，并简化了部分 Vue 组件代码的写法。

## 安装

```sh
npm i -S dasta
```

## 使用

在 webpack.config.js 中添加

```JavaScript
externals: {
  'dasta': 'dasta'
}
```

在 index.html 中用标签引入模块

```HTML
<script src="https://cdn.jsdelivr.net/npm/@yogurtcat/lib@1.0.5/dist/index.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dasta@1.0.22/dist/index.min.js"></script>
```

在 TypeScript（或 JavaScript）中导入

```TypeScript
import {Component} from 'dasta'
```

## 示例

```TypeScript
const addClick = c => c.merge({
  methods: {
    click() {
      console.log('click!')
    }
  },
  render: {
    A: {
      X: 'O',
      I: {
        on: {
          X: 'O',
          I: {
            click: `this.click`
          }
        }
      }
    }
  }
})

const component = new Component({
  name: 'hlv',
  props: {
    lv: Number,
    a: 'AAA',
    b: 'BBB'
  },
  data: {
    X: 'O',
    I: {
      da: `this.a`,
      db: `this.b`
    }
  },
  computed: {
    ab(){
      return `(${this.da}|${this.db})`
    }
  },
  render: {
    X: 'H',
    N: `'h'+this.lv`,
    C: {
      X: 'A',
      I: [
        `this.ab`,
        `this.$slots.default`
      ]
    }
  }
}).$(
  // 添加装饰器
  addClick
).component
```

其中的 component 变量等价于

```TypeScript
const component = {
  name: 'hlv',
  props: {
    lv: {
      type: Number,
      required: true
    },
    a: {
      type: String,
      default: 'AAA'
    },
    b: {
      type: String,
      default: 'BBB'
    }
  },
  data() {
    return {
      da: this.a,
      db: this.b
    }
  },
  computed: {
    ab(){
      return `(${this.da}|${this.db})`
    }
  },
  render(h) {
    return h(
      'h'+this.lv,
      {
        on: {
          click: this.click
        }
      },
      [
        this.ab,
        this.$slots.default
      ]
    )
  },
  methods: {
    click() {
      console.log('click!')
    }
  }
}
```
