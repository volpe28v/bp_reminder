import request = require('request')
import http = require('http')

export interface SlackPostForm {
    token?: string
    channel?: string
    username?: string
    text?: string
}

export default class Slack {
    constructor() {
    }

    post(form: SlackPostForm, callBack: (error: any, response: http.IncomingMessage, body: any) => void) {
        let options: request.CoreOptions = {
            form: {
                token: form.token || '',
                channel: form.channel || '',
                username: form.username || '',
                text: form.text || ''
            }
        }
        request.post('https://slack.com/api/chat.postMessage', options, (error, response, body) => {
            callBack(error, response, body)
        })
    }
}