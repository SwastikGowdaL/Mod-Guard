![Component 6](https://user-images.githubusercontent.com/68393994/136546938-9b152192-42b2-4197-af96-aaf2bc9198b1.png)

## Mod-Guard

**One-stop-shop** for all your **content moderation** - nsfw, weapons, alcohol, drugs, gore,offensive symbols imagery detection, & profanity/bad-words detection/filter & spam detection & spamEmail detection & malicious URL detection.

> This is language agnostic , that means it doesn't matter which programming languages you are using , since we have implemented different strategies/patterns to communicate with various application, you can integrate it easily with our application as well.

> Most of the tools I have used to build this project are open source, so if you are interested , you can implement them by yourself, this tool is just an abstraction of all the complexity that comes when integrating multiple tools for all these services, so this tool will provide you with an easy way to integrate those services in your application and communicate with it in multiple ways.

## Installing

> **Note** : You have to self host this application , explanation for self hosting is provided below as well.

> **Prerequisites** : Node.js, npm and git bash installed in your computer/laptop.

**Step 1:**
Run this command in your git bash terminal -

```
git clone https://github.com/SwastikGowdaL/Mod-Guard.git
```

**Step 2:**
Inside the repo, run this command in the git bash terminal, to install all the dependencies -

```
npm install
```

**Step 3:**
Create `.env` file in the root directory of the cloned repo, like this - `Mod-Guard/.env`
Mod-Guard is the cloned repo, and you should create `.env` file inside that

<a href="https://g.co/kgs/HVA7Mb"><img src="https://i.ibb.co/PcTst0F/modg.png" alt="mod guard" border="0"></a>

## Getting Started

As i told you guys before I am using various free, open source and freemium service , so this tool need to connect to those services to funciton, and these services provide you with the free api key to use their service with some limitations, you need to specify those api keys in the .env file , and the application will make use of that .

- In the `.env` file specify the port you want to use -

  <code> PORT=_your-desired-port_ </code>

  > If not specified, it will use port 3001 by default

- In the `.env` file specify the authentication key that you want to use and make sure that you provide that auth key in the header of each and every request from the client, provide the auth key like this in the `.env` -

  <code>AUTH_KEY=_your-auth-key_</code>

  > This is integrated for security purposes, and I have also implemented rate limiter for basic protection against attacks like DDoS and brute force , we have used the [express-slow-down](https://www.npmjs.com/package/express-slow-down) module for this , which is based on the token bucket slow down algorithm, that means if more that 3 requests are sent in 1 sec, then our rate limiter is gonna make the subsequent request wait for 1 sec and this is implemented only on API strategy api endpoint and no rate limiter imposed on API + publisher/consumer strategy api endpoint.

- For any imagery detection, I am using [sightengine](https://sightengine.com/) api service , go to their website & [sign up](https://dashboard.sightengine.com/signup) to their free service , then they will provide you with an [api user key](https://dashboard.sightengine.com/api-credentials) and [api secret key](https://dashboard.sightengine.com/api-credentials) , specify those keys in the `.env` file like this -

  <code>SIGHT_ENGINE_API_USER=_your-api-user-key_
  SIGHT_ENGINE_API_SECRET=_your-api-secret_
  BLOG=_your-blog-website-url_ </code>

  > Its an awesome service , but the api requests that can be made is limited for free service , so if you want to do a lot of imagery detection, I recommend you buy a paid plan.

- For Malicious URL detection and spam email detection , I am using the ipqualityscore service , they also provide you with generous free tier with some limitations , go to their [website](https://www.ipqualityscore.com/create-account) and [sign up](https://www.ipqualityscore.com/create-account) to their service , and then they will provide you with an [api key](https://www.ipqualityscore.com/documentation/malicious-url-scanner-api/overview#:~:text=Parked%20Domain%20Detection%20API,Private%20Key), specify it, inside the `.env` file like this -

  <code>MALICIOUS_URL_SCANNER_KEY=_your-api-key_</code>

  > Its is also an awesome service , but the api requests that can be made is limited for free service , so if you want to do a lot of malicious URL detection, I recommend you buy a paid plan.

- For spam content detection , I am using Akismet api service , they also provide you with generous free tier with some limitations , go to their website and [sign up](https://akismet.com/signup/#personal) for the service , after that they will email you the api key , specify it , inside the `.env` file like this -

  <code>AKISMET_KEY=_your-api-key_</code>

  > It is also a good service , but the limitation is that you can use it for free only on personnal projects , if you want to use it for commercial projects , you have to buy the paid plan.

- For publisher/consumer strategy and API+publisher/consumer strategy, I am using the RabbitMQ message broker , and that message broker is should be hosted and maintained by a cloud provider called CloudAMQP , go to their [website](https://customer.cloudamqp.com/login) create an account and choose their free tier and create an instance , for more details on creating an instance go through this [video](https://youtu.be/e03c3CIGtYU?t=5303) , once you create an instance, you will get the link to that cloud instance/server , specify it in the `.env` file like this -

  <code> RABBITMQ_SERVER=_your-rabbiMQ-instance-link_</code>

If you have followed along the steps properly, your `.env` file should look something like this -

<a href="https://ibb.co/pJQqjWm"><img src="https://i.ibb.co/BqGk241/2021-10-13-09-04.png" alt="2021-10-13-09-04" border="0"></a>

**There are various strategies for communicating with our tool -**

1.  Api Strategy (Rest API's)
2.  API + Publisher/Consumer Strategy
3.  Publisher/Consumer Strategy (Asynchronous messaging/Message Broker)
    
> Choose the appropriate strategy based on your use-case.

### 1. Api Strategy

Using this strategy is just like communicating with any other Rest api's out there!

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

### For more info on using the API strategy go through this [API Documentation](https://documenter.getpostman.com/view/14691472/UV5TEyxx) , implementation using different programming languages are also provided along with an explanation and example requests.
