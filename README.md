# CanvasLMS-ChatGPT

## 简介

这是一个用于 Canvas LMS 平台接入 ChatGPT 的 API 的项目，可以实现向对应的人工智能账号发送站内信后，收到 ChatGPT 的回复。ChatGPT 是一个基于 GPT-3 模型的聊天机器人，可以让学生直接问问题，可能会有一定的错误率，请提醒学生需要自己严格判断。

## 安装

使用前用

```nodejs
npm i
```

安装下环境即可。请注意 nodejs 版本，尽量 18 及以上。

## 配置

将 .env.sample 复制为 .env，并将 OPENAI_API_KEY CANVASLMS_TOKEN CANVASLMS_HOST PROMPT_PREFIX 改为对应的配置，即可启动项目。具体配置说明如下：

- OPENAI_API_KEY: 你的 OpenAI API 密钥，用于调用 ChatGPT 的 API。
- CANVASLMS_TOKEN: 你的 Canvas LMS 平台想作为人工智能的账号的访问令牌（例如可以新建一个账号叫MOSS），用于接收和发送站内信。
- CANVASLMS_HOST: 你的 Canvas LMS 平台的主机地址，例如 https://canvas.instructure.com 。
- PROMPT_PREFIX: 机器人的预设，例如“你是一位计算机教师，负责解答学生的问题。”。

## 使用

启动项目后，你可以向你在 Canvas LMS 平台上设置的人工智能账号发送站内信，然后等待 ChatGPT 的回复。由于 ChatGPT 的 API 有调用限制，特意做了队列，每隔 10 秒回复一条消息，按照问题发送的时间顺序作为回复优先级。如果有人连续发多条消息，那么只会回复最后一条。

## 贡献

欢迎任何形式的贡献，包括提交问题、建议、改进或者拉取请求。请在提交前阅读 [贡献指南](CONTRIBUTING.md) 。

## 许可

这个项目使用 [MIT](LICENSE) 许可证。

---

# CanvasLMS-ChatGPT

## Introduction

This is a project that integrates ChatGPT's API into the Canvas LMS platform, allowing you to receive ChatGPT's responses after sending messages to the corresponding artificial intelligence account. ChatGPT is a chatbot based on the GPT-3 model, which can generate natural and interesting conversations.

## Installation

You can install the environment with

```nodejs
npm i
```

before using it. Please note the nodejs version, preferably 18 or above.

## Configuration

Copy .env.sample to .env

Change the configuration OPENAI_API_KEY CANVASLMS_TOKEN CANVASLMS_HOST PROMPT_PREFIX in .env to the corresponding configuration, and you can start the project. The specific configuration instructions are as follows:

- OPENAI_API_KEY: Your OpenAI API key, used to call ChatGPT's API.
- CANVASLMS_TOKEN: Your Canvas LMS platform robot account access token, used to receive and send messages.
- CANVASLMS_HOST: Your Canvas LMS platform host address, such as https://canvas.instructure.com .
- PROMPT_PREFIX: The prefix you want ChatGPT to add before the reply, such as "You are a teacher.".

## Usage

After starting the project, you can send messages to the artificial intelligence account you set up on the Canvas LMS platform, and then wait for ChatGPT's reply. Due to the call limit of ChatGPT's API, a queue is specially made, and one message is replied every 10 seconds, according to the time of sending the question as the reply priority. If someone sends multiple messages in a row, only the last one will be replied.

## Contributing

Any form of contribution is welcome, including submitting issues, suggestions, improvements, or pull requests. Please read the [contribution guide](CONTRIBUTING.md) before submitting.

## License

This project uses the [MIT](LICENSE) license.