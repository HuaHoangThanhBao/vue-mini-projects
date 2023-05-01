import { defineComponent, h, type VNode } from "vue";

type ChainAction = {
  done?: () => void;
  cancel?: () => void;
  isCancel?: boolean;
  close?: () => void;
  message?: string;
};

interface ComponentHelper {
  show: (args: ChainAction) => void;
}

export class Chain implements ComponentHelper {
  protected nextChain!: Chain;

  setNext(nextLogger: Chain) {
    this.nextChain = nextLogger;
  }

  getNext() {
    return this.nextChain;
  }

  show(args: ChainAction) {
    this.nextChain.show({ ...args });
  }
}

export class Step extends Chain {
  component: any;

  constructor(component: any) {
    super();
    this.component = component;
  }

  show(args: ChainAction) {
    const component = this.component;

    return defineComponent({
      render(): VNode {
        return h(component, { isVisible: true, ...args });
      },
    });
  }
}
