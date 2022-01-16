/* 教材：2. 仮想DOM */
import h from "./vdom/createElement";
// import { render } from "./vdom/render";
import { app } from './vdom/app'

const INITIAL_STATE = {
    accounts: [
        {
            id: 1,
            name: "リオネル・メッシ",
            team: "FCバルセロナ",
            description: "アルゼンチンサンタフェ州ロサリオ出身のイタリア系アルゼンチンサッカー選手。リーガ・エスパニョーラ・FCバルセロナ所属。アルゼンチン代表。ポジションはフォワード（wikipedia）",
            isFollow: false,
        },
        {
            id: 2,
            name: "クリスティアーノ・ロナウド",
            team: "Juventus",
            description: "ポルトガル・フンシャル出身のサッカー選手。セリエA・ユニヴェントスFC所属。ポルトガル代表。ポジションはフォワード（wikipedia）",
            isFollow: true,
        },
        {
            id: 3,
            name: "ネイマール",
            team: "パリサンジェルマン",
            description: "ブラジル・サンパウロ州モジ・ダス・クルーゼス出身のサッカー選手。ブラジル代表。リーグ・アン・パリ・サンジェルマンFC所属。ポジションはフォワード（wikipedia）",
            isFollow: false,
        },
    ]
}

const actions = {
    toggleFollow(state, id) {
        const accounts = state.accounts.map(f => {
            if (f.id === id) {
                return { ...f, isFollow: !f.isFollow }
            } else {
                return f
            }
        })

        return { ...state, accounts }
    }
}

// React component と同義
const accountItem = (account, action) => {
    return h('div', {
        attrs: {},
        children: [
            h('div', {
                attrs: {
                    class: 'account__summary',
                },
                children: [
                    h('div', {
                        attrs: {},
                        children: [
                            h('p', {
                                attrs: {
                                    class: 'account__name',
                                },
                                children: [account.name],
                            }),
                            h('p', {
                                attrs: {
                                    class: 'account__team',
                                },
                                children: [account.team],
                            }),
                        ],
                    }),
                    h('div', {
                        attrs: {},
                        children: [
                            h('button', {
                                attrs: {
                                    type: 'button',
                                    class: `followBtn ${account.isFollow ? 'isFollow' : ''}`,
                                    onclick: () => action.toggleFollow(account.id),
                                },
                                children: [account.isFollow ? 'フォロー中' : 'フォローする'],
                            }),
                        ],
                    }),
                ],
            }),
            h('p', {
                attrs: {
                    class: 'account__description',
                },
                children: [account.description],
            }),
        ],
    })
}

const view = (props, action) => h("ul", {
  attrs: {
      class: 'accountList',
  },
  children: props.accounts.map(e => {
      return h('li', {
          attrs: {
              class: 'accountList__item',
          },
          /* accountItem(e) = Reactのcomponentの役割 */
          children: [accountItem(e, action)],
      })
  }),
});

// const app = render(view(INITIAL_STATE))
// const el = document.getElementById('app')
// el.appendChild(app)
app({
    root: '#app',
    initialState: INITIAL_STATE,
    view,
    actions,
})
