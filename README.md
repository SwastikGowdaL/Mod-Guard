![Component 6](https://user-images.githubusercontent.com/68393994/136546938-9b152192-42b2-4197-af96-aaf2bc9198b1.png)
<center>
[![GitHub license](https://img.shields.io/github/license/SwastikGowdaL/Mod-Guard)](https://github.com/SwastikGowdaL/Mod-Guard/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/SwastikGowdaL/Mod-Guard)](https://github.com/SwastikGowdaL/Mod-Guard/issues)
[![GitHub forks](https://img.shields.io/github/forks/SwastikGowdaL/Mod-Guard)](https://github.com/SwastikGowdaL/Mod-Guard/network)
[![GitHub stars](https://img.shields.io/github/stars/SwastikGowdaL/Mod-Guard)](https://github.com/SwastikGowdaL/Mod-Guard/stargazers) 
</center>
## Mod-Guard

**One-stop-shop** for all kinds of **content moderation** - nsfw, weapons, alcohol, drugs, gore,offensive symbols imagery detection, & profanity/bad-words detection/filter & spam detection & spamEmail detection & malicious URL detection.

> This is language agnostic , that means it doesn't matter which programming languages you are using , since we have implemented different strategies/patterns to communicate with various application, you can integrate it easily with our application as well.

> Most of the tools I have used to build this project are open source, so if you are interested , you can implement them by yourself, this tool is just an abstraction of all the complexity that comes when integrating multiple tools for all these services, so this tool will provide you with an easy way to integrate those services in your application and communicate with it in multiple ways.

## Table of Contents

- [Advantages / Key-features of Mod-Guard](#advantages--key-features-of-mod-guard)
- [Installing](#installing)
- [Getting Started/Usage](#getting-started--usage)
  - [Api Strategy](#1-api-strategy)
  - [Api + Publisher/Consumer Strategy](#2-api--publisher--consumer-strategy)
  - [Publisher/Consumer Strategy](#3-publisherconsumer-strategy)
- [Examples](#examples)
- [Help Getting Started](#help-getting-started)
- [Contributing](#contributing)
- [Creator](#creator)
- [Acknowledgments](#acknowledgments-)
- [Copyright-and-License](#copyright-and-license)

## Advantages / Key-features of Mod-Guard

| Features                           | Mod-Guard |
| :--------------------------------- | :-------: |
| NSFW image detection               |     ✓     |
| Alcohol image detection            |     ✓     |
| Weapons image detection            |     ✓     |
| Drugs image detection              |     ✓     |
| Gore image detection               |     ✓     |
| Offensive symbol image detection   |     ✓     |
| Malicious URL detection            |     ✓     |
| Profanity text detection           |     ✓     |
| Filter Profanity text              |     ✓     |
| Spam text detection                |     ✓     |
| Spam Email detection               |     ✓     |
| Ability to provide metadata        |     ✓     |
| Different communication strategies |     ✓     |
|NSFW.js for nudity detection saves Sightengine api points|✓|
|Rate Limiter|✓|

## Installing

> **Note** : You have to self host this application , explanation for self hosting is provided below as well.

> **Prerequisites** : Node.js, npm and git bash installed in your computer/laptop.
> If the Prerequisites are met you can run this application locally as well! 

**Step 1:**
`Fork` and then `clone` the forked repo!

![fork-clone](https://user-images.githubusercontent.com/68393994/137305485-f0c147ec-6083-4e08-9ca4-8dea1b61cb8a.gif)

**Step 2:**
Navigate inside the cloned repo, and from there open the terminal and run the following command, to install all the dependencies -

```
npm install
```

**Step 3:**
Create `.env` file in the root directory of the cloned repo, like this - `Mod-Guard/.env`
Mod-Guard is the cloned repo, and you should create `.env` file inside that!

<a href="https://g.co/kgs/HVA7Mb"><img src="https://i.ibb.co/PcTst0F/modg.png" alt="mod guard" border="0"></a>

## Getting Started / Usage

As i told you guys before I am using various free, open source and freemium service , so this tool need to connect to those services to funciton, and these services provide you with the free api key to use their service with some limitations, you need to specify those api keys in the .env file , and the application will make use of that .

- In the `.env` file specify the port you want to use -

  ```
  PORT=<your-desired-port>
  ```

  > If not specified, it will use port 3001 by default

- In the `.env` file specify the authentication key that you want to use and make sure that you provide that auth key in the header of each and every request from the client, provide the auth key like this in the `.env` -

  ```
  AUTH_KEY=<your-auth-key>
  ```

  > This is integrated for security purposes, and I have also implemented rate limiter for basic protection against attacks like DDoS and brute force , we have used the [express-slow-down](https://www.npmjs.com/package/express-slow-down) module for this , which is based on the token bucket slow down algorithm, that means if more that 10 requests are sent in 1 min from the same IP address, then our rate limiter is gonna make the subsequent request wait for 500 ms and this is implemented only on API strategy api endpoint and no rate limiter imposed on API + publisher/consumer strategy api endpoint. You can change the 10 request limit in the rateLimiter.js file in the middleware folder of this project.

- For any imagery detection, I am using [sightengine](https://sightengine.com/) api service , go to their website & [sign up](https://dashboard.sightengine.com/signup) to their free service , then they will provide you with an [api user key](https://dashboard.sightengine.com/api-credentials) and [api secret key](https://dashboard.sightengine.com/api-credentials) , specify those keys in the `.env` file like this -

  ```
  SIGHT_ENGINE_API_USER=<your-api-user-key>
  ```

  ```
  SIGHT_ENGINE_API_SECRET=<your-api-secret>
  ```

  ```
  BLOG=<your-blog-website-url>
  ```

  > Its an awesome service , but the api requests that can be made is limited for free service , so if you want to do a lot of imagery detection, I recommend you buy a paid plan.

- For Malicious URL detection and spam email detection , I am using the ipqualityscore service , they also provide you with generous free tier with some limitations , go to their [website](https://www.ipqualityscore.com/create-account) and [sign up](https://www.ipqualityscore.com/create-account) to their service , and then they will provide you with an [api key](https://www.ipqualityscore.com/documentation/malicious-url-scanner-api/overview#:~:text=Parked%20Domain%20Detection%20API,Private%20Key), specify it, inside the `.env` file like this -

  ```
  MALICIOUS_URL_SCANNER_KEY=<your-api-key>
  ```

  > Its is also an awesome service , but the api requests that can be made is limited for free service , so if you want to do a lot of malicious URL detection, I recommend you buy a paid plan.

- For spam content detection , I am using Akismet api service , they also provide you with generous free tier with some limitations , go to their website and [sign up](https://akismet.com/signup/#personal) for the service , after that they will email you the api key , specify it , inside the `.env` file like this -

  ```
  AKISMET_KEY=<your-api-key>
  ```

  > It is also a good service , but the limitation is that you can use it for free only on personnel projects , if you want to use it for commercial projects , you have to buy the paid plan.

- For publisher/consumer strategy and API+publisher/consumer strategy, I am using the RabbitMQ message broker , and that message broker is should be hosted and maintained by a cloud provider called CloudAMQP , go to their [website](https://customer.cloudamqp.com/login) create an account and choose their free tier and create an instance , for more details on creating an instance go through this [video](https://youtu.be/e03c3CIGtYU?t=5303) , once you create an instance, you will get the link to that cloud instance/server , specify it in the `.env` file like this -

  ```
  RABBITMQ_SERVER=<your-rabbiMQ-instance-link>
  ```

  > This is not necessary if you are going to use only the API strategy, since it doesn't require a message broker.

If you have followed along the steps properly, your `.env` file should look something like this -

<a href="#"><img src="https://i.ibb.co/BqGk241/2021-10-13-09-04.png" alt="mod guard .env" border="0"></a>

**There are various strategies for communicating with our tool -**

1.  Api Strategy (Rest API's)
2.  API + Publisher/Consumer Strategy
3.  Publisher/Consumer Strategy (Asynchronous messaging/Message Broker)

> Choose the appropriate strategy based on your use-case.

### 1. Api Strategy

Using this strategy is just like communicating with any other Rest api's out there!

<a href="#"><img src="https://i.ibb.co/q0CLTrZ/API-strategy-drawio.png" alt="API-strategy-drawio" border="0"></a>

#### Request structure (multipart/form-data) -

> **NOTE**: Remember requests must be of multipart/form-data

| Parameters              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| strategy (**required**) | This field accepts either **1** or **2** as its value , **1** means **API strategy** , **2** means **API + Publisher/Consumer strategy**                                                                                                                                                                                                                                                                                                                                            |
| image_file              | This field accepts image file , so provide the image file and make sure that you don't provide the image_link along with this as well and I have set the size limit of image to be less than **5 MB** , you can increase/decrease that as well , in the multer.js file located in the middleware folder.                                                                                                                                                                            |
| image_moderation        | This field accepts **nudity,gore,wad,offensive** as value, you can only choose from these moderation models.                                                                                                                                                                                                                                                                                                                                                                        |
| image_link              | This field accepts complete **URL/URI** of the image , including the http or https , and make sure that you don't provide the image_file along with this as well                                                                                                                                                                                                                                                                                                                    |
| isProfane               | This field accepts text and returns whether the text was profane or not!                                                                                                                                                                                                                                                                                                                                                                                                            |
| filter_profanity        | This field accepts **text** with or without **profanity/bad-words** and returns the profanity/bad-words **filtered text**                                                                                                                                                                                                                                                                                                                                                           |
| isMalicious             | This field accepts **URL** of a website and returns whether it is malicious or not!                                                                                                                                                                                                                                                                                                                                                                                                 |
| isSpam[content]         | This field accepts **text** and detects whether the text is spam or not, for detecting it also needs ip address and useragent of the sender, perfect use-case : comments on a post, sending the ip address & useragent of the commenter                                                                                                                                                                                                                                             |
| isSpam[ip]              | This field accepts **ip** address of the text sender, needed to help detect whether the text is spam or not                                                                                                                                                                                                                                                                                                                                                                         |
| isSpam[useragent]       | This field accepts the browsers **useragent** of the text sender, needed to help detect whether the text is spam or not                                                                                                                                                                                                                                                                                                                                                             |
| isSpam[name]            | This field accepts name of the spam **text** sender , for more accuracy , but not compulsory                                                                                                                                                                                                                                                                                                                                                                                        |
| isSpam[email]           | This field accepts **email** of the spam text sender , for more accuracy , but not compulsory                                                                                                                                                                                                                                                                                                                                                                                       |
| isSpamEmail             | This field accepts any **email** and determines whether that email is marked as spam or not                                                                                                                                                                                                                                                                                                                                                                                         |
| metadata                | This is just the reference info that client can provide along with the request ,it can be of any type and this will be returned back with the response and this will not be stored by the server , use-case : if you are using our API + publisher/consumer strategy , you might need to know info of some request later down the road, so for that you can add some metadata on each and every request, which will be propagated through and will be available at the consumer end |

#### For more info on using the API strategy go through this [API Documentation](https://documenter.getpostman.com/view/14691472/UV5TEyxx) , implementation using different programming languages are also provided along with an explanation and example requests.

**Pros/Cons of using API strategy -**

1. It is quite simple to use.
2. If you are sending a lot of data for moderation or if the image is large, then it can take a lot time to send the response back so there is latency involved and for tackling that I have implemented the other 2 strategies.

### 2. Api + Publisher / Consumer Strategy

<a href="#"><img src="https://i.ibb.co/KWMs2CP/api-pubcon.jpg" alt="api-pubcon" border="0"></a>

This strategy is provided for those who don't want to wait for the moderation response immediately and also don't want to learn to use or integrate message broker to their existing application, using this strategy , you send a rest api request along with the data to this tool and this tool will enqueue those data in the message queue and will immediately send the response back to you saying that the message data has been enqueued and that data will be processed later and the response will be available at the consumer end , there you can do whatever you want with the response.

> Eg - Let's say you have an application like instagram, where the user posts an image, text etc.., you can send those to mod-guard for moderation , but the moderation will take too long if you have chosen the api strategy , but you have to give the user a response immediately whether the post has been posted or not , so at that time you can use this API+Publisher/consumer strategy wherein you send those data using rest api's but that data will not be processed immediately , they will be enqueued in the message queue for it to be processed later, after enqueuing the data (enqueuing of data will only take around 20-30 ms) successful, enqueued response will be sent to you and by this you can say to user that the post has been successfully posted , now the consumers will dequeue that data and will process and do moderation on that data and the response will be available , so you can do whatever you want with the response, like for eg you can delete the post if it contains an nsfw image and send a notification to the user as well or you can successfully save it in your database etc..,

#### Request structure (multipart/form-data) -

> **NOTE**: Remember requests must be of multipart/form-data

The requests can be sent to either of the endpoints, to know the endpoints go through this [API Doc](https://documenter.getpostman.com/view/14691472/UV5TEyxx).

- One of the api endpoint is same as the above API strategy and the request format is also same but make sure that you specify 2 as the value for the strategy field. (Imp - This api endpoint has the rate limiter implemented on it, remember that, you can also change the rate limit value as well.)
- Then there is another api endpoint dedicated only for this strategy , go through this [API Doc](https://documenter.getpostman.com/view/14691472/UV5TEyxx) for that. (There is no rate limiter implemented on this api endpoint since you will probably be sending many request and the response will not take too long as well.)

To use this strategy properly , navigate to root folder of my project and then inside that I have components folder and inside that I have modGuard folder, inside that I have consumers folder and inside that by default i have two instances of the same consumer called modGuardConsumer.js, on the 70th line of these two files you can write your code, there you will be able to to access the response of the moderation data.

<code>Mod-Guard/components/modGuard/consumers/modGuardConsumer.js</code>

<a href="https://ibb.co/7bDBP4y"><img src="https://i.ibb.co/6NSGzBs/2021-10-13-13-07.png" alt="modGuardConsumer" border="0"></a>

**Pros/Cons of using API + Publisher/Consumer strategy -**

1. This strategy can be used by only those who know to work with js/node js, since you will have to write your javascript code to access the response of moderation data and do what ever you want with it.
2. You can also write few lines of js to send the response of moderation data from consumer back to your server, and the server might be written in different prgramming language.
3. Since the data is enqueued in the message queue and that message queue is made persistent, there is no data loss, hence reliable!
4. Programmer doesn't have to learn about the message broker.

### 3. Publisher/Consumer Strategy

<a href="#"><img src="https://i.ibb.co/ZGGqN42/Pub-Con.jpg" alt="Pub-Con" border="0"></a>

In this strategy , the publisher will be integrated to your existing application , and that publisher will have the connection setup to the message queue which will be hosted in cloudAMQP, and this Mod-Guard tool will be hosted in any cloud hosting platforms (eg-heroku) and will act as only the consumer, which will dequeue the data that is being enqueued in the message queue and that data will be processed and the result of the moderation data will be available at the consumer end , just like the API+Publisher/Consumer strategy, you will write your own js code in the modGuardConsumer.js file to access the response of the moderation data, and do whatever you want with it.

<a href="https://ibb.co/7bDBP4y"><img src="https://i.ibb.co/6NSGzBs/2021-10-13-13-07.png" alt="modGuardConsumer" border="0"></a>

If you are using javascript/node.js, then you can use the modGuardPublisher.js file available in the publishers folder, which is inside the components folder and which is inside the root folder of the repo,
`Mod-Guard/components/modGuard/publishers/modGuardPublisher.js`  
You can just take this file and put it inside your code base and import it in your code and call the moderationDataPublisher() function and pass the moderation data as an argument to it , and that moderation data will be enqueued in the message queue and result of that moderation data will be available at the consumer end. But if you are using this publisher file in your code base, make sure that you install [amqplib](https://www.npmjs.com/package/amqplib) and [dotenv](https://www.npmjs.com/package/dotenv) packages.

<a href="https://ibb.co/j6wbSCp"><img src="https://i.ibb.co/Bz6c9h1/2021-10-14-11-27.png" alt="2021-10-14-11-27" border="0"></a>

If you are not using js, then go through this [website](https://www.rabbitmq.com/getstarted.html#:~:text=1%20%22Hello%20World,that%20does%20something) to implement publisher in your programming language and using that enqueue the moderation data in the "ModGuard" message queue.

**Moderation data structure -**
Moderation data structure/format should be same as the request format in API strategy.
Here instead of performing API request, you just pass the moderation data which is of type object as an argument to the moderationDataPublisher() function.

**Pros/Cons of using Publisher/Consumer strategy -**

1. Need to know about message brokers and just the basics of RabbitMQ.
2. This strategy is Highly recommended since there is not a lot of latency involved.
3. This strategy and the 2nd strategy are reliable due to persistent message queue, hence there will be no data loss.

## Examples
**1. Api strategy :**
   - Example 1 -
   ![API-strategy-eg-1](https://user-images.githubusercontent.com/68393994/137683120-705746f5-47e6-44a0-9360-42e61ff45a6a.png)
   - Example 2 -
   ![API-strategy-eg-2](https://user-images.githubusercontent.com/68393994/137683148-e4e68d17-3498-4bbb-b580-bba3ebb7310d.png)
   
**2. Api strategy + Publisher/Consumer strategy:**
   - Example 1 -
   ![Api strategy + Publisher/Consumer strategy-eg-1](https://user-images.githubusercontent.com/68393994/137683410-e5000bec-e466-4c7f-b388-a23d4bb11aca.png)
   - Example 2 -
   ![Api strategy + Publisher/Consumer strategy-eg-2](https://user-images.githubusercontent.com/68393994/137683439-0c31954b-68bd-4d19-8a33-04509a043003.png)  

## Help Getting Started 
If you need any help getting started with Mod-Guard, you can contact me on [Instagram-SwastikGowda](https://www.instagram.com/coder_rna/) or on [LinkedIn-SwastikGowda](https://www.linkedin.com/in/swastik-gowda-l-06972a18a/) or email me at swastik7999@gmail.com

## Contributing

Please read through our [contributing guidelines](https://github.com/SwastikGowdaL/Mod-Guard/blob/main/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

## Creator

**Swastik Gowda**

- https://www.instagram.com/coder_rna/
- https://www.linkedin.com/in/swastik-gowda-l-06972a18a/
- https://swastikgowdal.github.io/SwastikGowda-Portfolio/
- https://twitter.com/swastikgowda

## Acknowledgments 👍

Thanks to these awesome services/tools and technologies!

- [Sightengine](https://sightengine.com/)
- [ipqualityscore.com](https://www.ipqualityscore.com/)
- [RabbitMQ](https://rabbitmq.com/)
- [Cloudamqp](https://customer.cloudamqp.com/)
- [akismet](https://akismet.com/)
- [bad-words NPM package](https://www.npmjs.com/package/bad-words)
- [NSFWjs](https://www.npmjs.com/package/nsfwjs)

## Copyright and license

Code and documentation copyright 2021 [Swastik Gowda](https://swastikgowdal.github.io/SwastikGowda-Portfolio/). Code released under the [MIT License](https://github.com/SwastikGowdaL/Mod-Guard/blob/main/LICENSE).
