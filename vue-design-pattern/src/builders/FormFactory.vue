<template>
    <form action="" @submit.prevent="handleSubmit" :class="this.class">
        <div v-for="(field, index) in fields" :key="field.name" :class="this.rwClass">
            <label :for="field.name" :class="this.lbClass">
                {{field.label}}
            </label>
            <component 
                :id="field.name"
                :is="field.component"
                :type="field.type"
                v-bind="{...field.props, ...field.attrs}"
                :class="field.class"
                :model-value="field?.props?.value"
                @update:modelValue="this.onChangeHandler($event, field.name, index)"
            />
            <div class="error" v-if="errors[field.name]">
                {{errors[field.name]}}
            </div>
        </div>
        <button type="submit" @click="this.submit" :disabled="!submitable" :class="this.submitBtnClass">Submit</button>
        <button v-if="this.isCancel" @click="this.cancel" :disabled="!submitable" :class="this.cancelBtnClass">Cancel</button>
        <br />
        <br />
        <pre>{{ values }}</pre>
    </form>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { ZodError } from "zod"
import type { Field, ObjectGeneric } from "./FormBuilder";

export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export interface DataStructure {
  values: ObjectGeneric;
  errors: ObjectGeneric;
}

export default defineComponent({
  props: {
    id: {
      type: [String, Number],
      default: null,
    },
    fields: {
      type: Array as PropType<Field[]>,
      default: () => [],
    },
    class: {
      type: String,
      default: 'form-item'
    },
    rwClass: {
      type: String,
      default: 'form'
    },
    lbClass: {
      type: String,
      default: 'form-group'
    },
    submitBtnClass: {
      type: String,
      default: 'form-submit-btn'
    },
    cancelBtnClass: {
      type: String,
      default: 'form-cancel-btn'
    },
    submit: {
      type: Function
    },
    cancel: {
      type: Function
    },
    isCancel: {
      type: Boolean
    },
  },
  data(): DataStructure {
    return {
      errors: {},
      values: {},
    };
  },
  computed: {
    submitable() {
      const errors: number = [...Object.keys(this.errors)].filter(
        (i) => this.errors[i] != undefined
      ).length;
      return errors === 0;
    },
  },
  created() {
    const values: any = {};
    this.fields.forEach(({ name, props }) => {
      if (props?.value != undefined) {
        values[name] = props.value;
      }
    });
    this.values = values;
  },
  methods: {
    validate(value: string, validator: any): ValidationResult {
      try {
        validator.parse(value);
      } catch (error) {
        if (error instanceof ZodError) {
          return {
            valid: false,
            message: error.issues[0].message,
          };
        }
      }
      return {
        valid: true,
      };
    },
    async handleSubmit() {
      for (const { name, validation } of this.fields) {
        const { valid, message } = this.validate(this.values[name], validation);
        this.throwErrors(name, valid, message);
      }
      if (this.submitable) {
        console.log("submit!!!");
      }
    },
    throwErrors(
      fieldName: string,
      valid: boolean,
      message: string | undefined
    ) {
      if (!valid) {
        this.errors = {
          ...this.errors,
          [fieldName]: message,
        };
      } else {
        this.errors = {
          ...this.errors,
          [fieldName]: undefined,
        };
      }
    },
    onChangeHandler(payload: any, fieldName: string, fieldNumber: number) {
      const validator = this.fields[fieldNumber].validation;
      const { valid, message } = this.validate(payload, validator);
      this.throwErrors(fieldName, valid, message);
      this.values[fieldName] = payload;
    },
  },
});
</script>
