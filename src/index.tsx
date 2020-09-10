import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import { ConfigProvider } from 'antd'

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zh_CN}>
      <App />
    </ConfigProvider>

  </Provider>,
  document.getElementById('root')
)
