<script lang="tsx">
  import type { PropType } from 'vue'
  import { Result, Button } from 'ant-design-vue'
  import { defineComponent, ref, computed, unref } from 'vue'
  import { ExceptionEnum } from '@/enums/exceptionEnum'
  import { useRoute } from 'vue-router'

  import { useGo } from '@/hooks/web/usePage'
  import { PageEnum } from '@/enums/pageEnum'

  interface MapValue {
    title: string
    subTitle: string
    btnText?: string
    icon?: string
    handler?: Fn
    status?: string
  }

  export default defineComponent({
    name: 'ErrorPage',
    props: {
      // 状态码
      status: {
        type: Number as PropType<number>,
        default: ExceptionEnum.PAGE_NOT_FOUND,
      },

      title: {
        type: String as PropType<string>,
        default: '',
      },

      subTitle: {
        type: String as PropType<string>,
        default: '',
      },

      full: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
    },
    setup(props) {
      const statusMapRef = ref(new Map<string | number, MapValue>())

      const { query } = useRoute()
      const go = useGo()
      const getStatus = computed(() => {
        const { status: routeStatus } = query
        const { status } = props
        return Number(routeStatus) || status
      })

      const getMapValue = computed((): MapValue => {
        return unref(statusMapRef).get(unref(getStatus)) as MapValue
      })

      const backLogin = '返回登录'
      const backHome = '返回首页'

      unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_ACCESS, {
        title: '400',
        status: `${ExceptionEnum.PAGE_NOT_ACCESS}`,
        subTitle: '异常',
        btnText: props.full ? backLogin : backHome,
        handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go()),
      })

      return () => {
        const { title, subTitle, btnText, icon, handler, status } = unref(getMapValue) || {}
        return (
          <Result
            status={status as any}
            title={props.title || title}
            sub-title={props.subTitle || subTitle}
          >
            {{
              extra: () =>
                btnText && (
                  <Button type="primary" onClick={handler}>
                    {() => btnText}
                  </Button>
                ),
              icon: () => (icon ? <img src={icon} /> : null),
            }}
          </Result>
        )
      }
    },
  })
</script>
