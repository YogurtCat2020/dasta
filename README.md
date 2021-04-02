# **刀削面**（**Dasta**）

**刀削面**（**Dasta**，Pasta 首字母改成 D），基于 TypeScript 开发，
允许用 面向切面 方式开发 Vue 组件。



## **安装**

首先通过 npm 安装，
`dasta` 依赖于 `@yogurtcat/lib`

```sh
npm i -S @yogurtcat/lib
npm i -S dasta
```

### **直接和目标代码打包**

啥也不加。

### **通过标签引入**

在 webpack.config.js 文件中添加

```JavaScript
externals: {
  '@yogurtcat/lib': 'global $yogurtcat$lib',
  'dasta': 'global dasta'
}
```

在 html 文件中添加

```HTML
<script src="https://cdn.jsdelivr.net/npm/@yogurtcat/lib@{版本号}/dist/index.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dasta@{版本号}/dist/index.min.js"></script>
```

其中的 `{版本号}` 请查询最新版本号后替换。

### **在 Vue 项目中使用**

在 webpack.config.js 文件中添加

```JavaScript
externals: {
  '@yogurtcat/lib': 'global $yogurtcat$lib',
  'dasta': 'global dasta'
}
```

在 main.js 文件中添加

```JavaScript
import '@yogurtcat/lib/dist/index.min.js'
import 'dasta/dist/index.min.js'
```

### **二次开发 npm 包**

如果目标包通过 webpack 打包，
则在 webpack.config.js 文件中添加

```JavaScript
externals: {
  '@yogurtcat/lib': 'commonjs2 @yogurtcat/lib',
  'dasta': 'commonjs2 dasta'
}
```

或者
如果目标包通过标签引入，
则在 webpack.config.js 文件中添加

```JavaScript
externals: {
  '@yogurtcat/lib': 'global $yogurtcat$lib',
  'dasta': 'global dasta'
}
```



## **使用**

`dasta` 主要使用了 `@yogurtcat/lib` 中的 
`Mass`、`Decor`、`Code`、`evaluate`，
请先学习这些模块的使用方法：

- npm: <https://www.npmjs.com/package/@yogurtcat/lib>
- github: <https://github.com/YogurtCat2020/lib>

### **Code 语法 H 扩展**

`dasta` 实现了 Code 语法 H 扩展，
用于生成 Vue 组件 中 render 函数 中的 h 调用。
h 的用法参考 Vue 官方文档。

```TypeScript
import {Code} from '@yogurtcat/lib'
import 'dasta'

/**
 * H 扩展
 * N（name）键 定义 h 调用 中的 组件名
 * A（attrs）键 定义 h 调用 中的 attrs 参数
 * C（children）键 定义 h 调用 中的 children 参数
 */
Code.new({
    X: 'H',
    N: `'div'`,
    A: {
      X: 'O',
      I: {
        class: {
          X: 'A',
          I: [`'container'`]
        },
        style: {
          X: 'O',
          I: {
            width: `'100%'`
          }
        }
      }
    },
    C: {
      X: 'A',
      I: [
        `'hello'`
      ]
    }
  }).$
=== `h('div', {class: ['container'],
style: {width: '100%'}}, ['hello'])`
```

### **Component 静态方法**

`dasta` 中的主要功能通过 `Component` 类 实现。
`Component` 类 定义了几个 静态方法。

```TypeScript
import {Component} from 'dasta'

// 生成 Vue 组件 中的 data 函数
// 传入参数为任意 Code
Component.codeData({
    X: 'O',
    I: {
      value: `'hello'`
    }
  })
=== `(function(){return {value: 'hello'}})`

// 生成 Vue 组件 中的 render 函数
// 传入参数为 H 扩展 Code
Component.codeRender({
    X: 'H',
    N: `'div'`,
    A: {
      X: 'O',
      I: {
        class: {
          X: 'A',
          I: [`'container'`]
        },
        style: {
          X: 'O',
          I: {
            width: `'100%'`
          }
        }
      }
    },
    C: {
      X: 'A',
      I: [
        `'hello'`
      ]
    }
  })
=== `(function(h){return h('div', {class: ['container'],
style: {width: '100%'}}, ['hello'])})`

// 等价于 evaluate(Component.codeData(codes), context, contextName)
Component.funcData(codes, context?, contextName?)

// 等价于 evaluate(Component.codeRender(codes), context, contextName)
Component.funcRender(codes, context?, contextName?)
```

### **Component 组件**

定义 `Component` 类对象 可以直接生成 Vue 组件。

```TypeScript
new Component({
    name: 'MyComponent',

    /**
     * props 中每一项的 值 为 一个值 或 一个数组
     * 一个值 等价于 长度为 1 的数组
     * 数组长度最多为 3
     * 当数组长度 === 1
     *   第一项 为 类型 或 默认值
     * 当数组长度 === 2
     *   第一项 为 类型
     *   第二项 为 默认值
     * 当数组长度 === 3
     *   第一项 为 validator
     *   第三项 为 布尔
     *     true 表示 required
     *     false 表示 第二项 为 默认值
     */
    props: {
      a: [],
      b: String,
      c: 'hi',
      d: [String, 'hi'],
      e: [x => is.str(x), null, true],
      f: [x => is.str(x), 'hi', false]
    }  /*{
      a: {
        type: null,
        required: true
      },
      b: {
        type: String,
        required: true
      },
      c: {
        type: String,
        default: 'hi'
      },
      d: {
        type: String,
        default: 'hi'
      },
      e: {
        validator: x => is.str(x),
        required: true
      },
      f: {
        validator: x => is.str(x),
        default: 'hi'
      }
    }*/,

    /**
     * 等价于 Component.funcData 的 参数 codes
     */
    data: {
      X: 'O',
      I: {
        v: `'hi'`
      }
    }  // (function(){return {v: 'hi'}}),

    /**
     * 等价于 Component.funcRender 的 参数 codes
     */
    render: {
      X: 'H',
      N: `'div'`,
      C: {
        X: 'A',
        I: [
          `'hi'`
        ]
      }
    }  // (function(h){return h('div', ['hi'])}),

    /**
     * 等价于 Component.funcData、Component.funcRender 
     * 的 参数 context、contextName
     * 这两个 参数 由 data、render 共享
     * 编译后 这两个 参数 会从组件对象中删除
     */
    context: {},
    contextName: 'C',

    /**
     * 其他参数 和 Vue 组件 中的写法相同
     */
    methods: {
      say() {
        console.log(this.v)
      }
    }
  })

  /**
   * Component 对象 是 Container<any, any> 的 子类
   * 相当于 Mass
   * 可以使用 Mass 的相关方法
   */
  .decor(
    x => {x.merge({
      computed: {
        value() {
          return this.c + ' '+ this.v
        }
      }
    })}
  )

  /**
   * .$ 表示 编译
   * 会将 Component 对象 转化成 Vue 组件 对象
   * 一个 Component 对象 
   *   只能 转化一次，
   *   只能 转化成 一个 Vue 组件 对象
   */
  .$
```
