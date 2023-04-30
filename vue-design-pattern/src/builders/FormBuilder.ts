import { defineComponent, h, type VNode } from 'vue'
import FormFactory from './FormFactory.vue'

export interface ObjectGeneric {
    [keys: string]: any
}

export interface Field {
    component: any
    type: any
    label?: any
    name: string
    props?: ObjectGeneric
    attrs?: ObjectGeneric
    validation?: any
    class?: string
    lbClass?: string;
    frmClass?: string;
    rwClass?: string
}

export interface FormStyle {
    frmClass?: string;
    lbClass?: string;
    rwClass?: string
    submitBtnClass?: string
    cancelBtnClass?: string
}

export interface FormAction {
    submit?: () => void
    cancel?: () => void
    isCancel?: boolean
}

export default class FormBuilder {
    fields: Field[]
    provider: any
    style: FormStyle
    action: FormAction

    constructor() {
        this.fields = []
        this.style = {}
        this.action = {}
    }

    addField(field: Field) {
        this.fields.push(field)
        return this
    }

    addStyle(frmStyle: FormStyle) {
        this.style = frmStyle
        return this
    }

    addAction(action: FormAction) {
        this.action = action
        return this
    }

    build() {
        const Fields = this.fields;
        const style = this.style;
        const action = this.action;

        return defineComponent({
            props: {
                id: {
                    default: null,
                    type: String || Number
                }
            },
            render(): VNode {
                return h(FormFactory, { fields: Fields, id: this.id, ...style, class: style.frmClass, ...action })
            }
        })
    }
}