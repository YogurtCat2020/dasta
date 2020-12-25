import {base, container, evaluate} from '@yogurtcat/lib'

const {is, to} = base
const {Container, Mass} = container

export type Container<K, V> = container.Container<K, V>
export type Mass = container.Mass


export default class Component extends Container<any, any> {
  protected readonly container: Mass
  protected allow: boolean

  public constructor(args?: object) {
    super()
    this.container = Mass.new(args)
    this.allow = true
  }

  protected relocate(key: any): [Container<any, any>, any] {
    return [this.container, key]
  }

  public merge(args: any): Container<any, any> {
    this.container.merge(args)
    return this
  }

  public get component(): object {
    if(!this.allow) return null
    this.allow = false

    const context = this.componentContext
    const contextName = this.componentContextName
    const props = this.componentProps
    const data = this.componentData(context, contextName)
    const render = this.componentRender(context, contextName)

    const r = {}
    if(!is.un(props)) r['props'] = props
    if(!is.un(data)) r['data'] = data
    for(let [k, v] of this.container)
      if(to.bool(v)) r[k] = to.obj(v)
    if(!is.un(render)) r['render'] = render
    return r
  }

  protected get componentContext(): any {
    const context = this.container.take('context')
    return to.obj(context)
  }
  protected get componentContextName(): any {
    const contextName = this.container.take('contextName')
    return to.obj(contextName)
  }
  protected get componentProps(): object {
    const props = this.container.take('props')
    if(!to.bool(props)) return null
    const r = {}
    for(let [k, v] of props) {
      v = to.obj(v)
      if(!is.arr(v)) v = [v]
      if(v.length <= 0) v = {
        type: null,
        required: true,
      }
      else if(v.length == 1) {
        const [v0] = v
        if(is.type(v0)) v = {
          type: v0,
          required: true,
        }
        else v = {
          type: to.type(v0),
          default: v0,
        }
      } else if(v.length == 2) {
        const [v0, v1] = v
        v = {
          type: v0,
          default: v1,
        }
      } else {
        const [v0, v1, v2] = v
        if(!v2) v = {
          validator: v0,
          default: v1,
        }
        else v = {
          validator: v0,
          required: true,
        }
      }
      r[k] = v
    }
    return r
  }
  protected componentData(context?: any, contextName?: string): Function {
    const data = this.container.take('data')
    if(!to.bool(data)) return null
    if(!['init', 'I', 'opr', 'O']
      .map(i => to.bool(data.get(i)))
      .reduce((s, c) => s || c, false)) return null
    return evaluate({
      template: `(function(){return @})`,
      codes: [data]
    }, context, contextName)
  }
  protected componentRender(context?: any, contextName?: string): Function {
    const render = this.container.take('render')
    if(!to.bool(render)) return null
    if(!['name', 'N']
      .map(i => to.bool(render.get(i)))
      .reduce((s, c) => s || c, false)) return null
    return evaluate({
      template: `(function(h){return @})`,
      codes:[render]
    }, context, contextName)
  }
  
  public $(...args: any[]): Component {
    return <any> super.$(...args)
  }
}
