
import {Options, Vue} from 'vue-class-component';
import {IKeyValue} from "@/types/any";

@Options({})
export default class FormServiceMixin extends Vue {

  public formData: IKeyValue = {}
  public submitted = false
  public schema = {
    label: {
      if: '$value',
      attrs: {
        style: { display: 'inline-block' },
      },
    },
  }

  public schemaMultiselect = {
    fieldset: {
/*      $el: 'input',
      attrs: {
        style: { display: 'inline-block' },
      },*/
    },
  }

  submitForm() {
    const node = this.formData?.value?.node
    node.submit()
  }
}

