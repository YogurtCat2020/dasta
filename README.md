# Dasta (刀削面)

A package for aspect-oriented development of Vue components.

Dasta (刀削面, Pasta change the first letter to D) developed based on TypeScript. It is used to encapsulate the repeated code in the Vue component object as decorators independently to improve the reusability of the code. And it simplified part of the Vue component code writing.

## Installation

```sh
npm i -S dasta
```

## Usage

Add in webpack.config.js

```JavaScript
externals: {
  'dasta': 'dasta'
}
```

Import modules by adding tags in index.html

```HTML
<script src="https://cdn.jsdelivr.net/npm/@yogurtcat/lib@1.0.10/dist/index.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dasta@1.0.30/dist/index.min.js"></script>
```

Import in TypeScript (or JavaScript)

```TypeScript
import {Component} from 'dasta'
```

## Examples

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
  // Add decorators
  addClick
).component
```

The component variable is equivalent to

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
