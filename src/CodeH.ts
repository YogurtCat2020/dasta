import {base, code} from '@yogurtcat/lib'

const {is, sugar} = base
const {Code} = code


export default class CodeH extends Code {
  public constructor(args: {name: any, attrs?: any, children?: any}) {
    const {template, T, codes, name, N, attrs, A, children, C, ...rem} = <any> sugar(args, {
      template: 'T',
      name: 'N',
      attrs: 'A',
      children: 'C'
    })

    const t = [`@`]
    const c = [name]

    if(!is.un(attrs)) {
      t.push(`@`)
      c.push(attrs)
    }
    if(!is.un(children)) {
      t.push(`@`)
      c.push(children)
    }

    super(Code.new({
      template: `h(${t.join(', ')})`,
      codes: c,
      ...rem
    }).code)
  }
}


Code.extension.set('H', x => new CodeH(x))
