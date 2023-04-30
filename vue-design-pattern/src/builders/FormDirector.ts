import VInput from "@/components/form/VInput.vue";
import type FormBuilder from "./FormBuilder";
import { FormStyle, FormAction } from "./FormBuilder";
import z from "zod";

export default class FormDirector {
  builder: FormBuilder;

  constructor(builder: FormBuilder) {
    this.builder = builder;
  }

  makeLoginForm() {
    const style: FormStyle = {
      frmClass: 'form-loign',
      rwClass: 'form-row',
      lbClass: 'form-label',
      submitBtnClass: 'form-submit-btn',
      cancelBtnClass: 'form-cancel-btn',
    }
    const formAction: FormAction = {
      submit: () => console.log('submited'),
      cancel: () => console.log('canceled'),
      isCancel: true
    }
    return this.builder
      .addField({
        component: VInput,
        name: "username",
        type: "text",
        label: "username",
        class: 'form--login__username',
        props: {
          value: "",
        },
        validation: z.string().min(10).max(40),
      })
      .addField({
        component: VInput,
        name: "password",
        type: "password",
        label: "password",
        class: 'form--login__username',
        props: {
          value: "default password",
        },
        validation: z.string().min(10),
      })
      .addStyle(style)
      .addAction(formAction)
      .build();
  }
  
  makeSignUpForm() {
    const formAction: FormAction = {
      submit: () => console.log('submited'),
      cancel: () => console.log('canceled')
    }
    return this.builder
      .addField({
        component: VInput,
        name: "username",
        type: "text",
        label: "username",
        class: 'form--signup__username',
        props: {
          value: "",
        },
        validation: z.string().min(10).max(40),
      })
      .addField({
        component: VInput,
        name: "age",
        type: "number",
        label: "age",
        class: 'form--signup__age',
        props: {
          value: 10,
        },
      })
      .addField({
        component: VInput,
        name: "password",
        type: "password",
        label: "password",
        class: 'form--signup__password',
        props: {
          value: "default password",
        },
        validation: z.string().min(10),
      })
      .addStyle({})
      .addAction(formAction)
      .build();
  }
}