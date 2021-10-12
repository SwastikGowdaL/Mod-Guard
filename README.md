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

There are various **strategies** for communicating with our tool -

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
