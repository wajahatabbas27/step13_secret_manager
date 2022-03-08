# Rotate Secret with lambda

After Every 24 hour , Secret will be updated automatically through rotation
Moreover we are just saying here to put the value , in the last step we are actually getting the value
We also need to tell on which secret , we need to specify the rotation
and then on that , we will going to apply the rotation

## sending keys to lambda function

basically in this part we are sending keys to the lambda function using the cdk and using that keys in the lamdba function
The secretName which we have provided must not be the null so we have to specify the empty strings in the lambda function , when calling the secret
through process.env

Its basically we need to send the secret and the keys to the lambda function that we need to update by rotating and we do it by sending the data from the stack to the lambda functon by defining the rotation in the stack , and also call the function.
Lambda function mein jb environment variable call kreinge to null expect krega to
process.env.SECRET_NAME || "" likhwana zrori hai

# Conclusion

Basically we want secret to rotate thats it and to rotate that secret we provide the rotation schedule in the stack for that particular lambda function and then in the lambda function we called that secret and its updated,

What we are doing is creating the lambda function which will create the secret after every 24 hours
And here we are putting the secret in the lambda function

We use Secret for the url,apikey , database id and much more , and we use it because it makes it easier for us to use it and manage the keys as it have many features to use the secrets ,
we can use it in the lambda function in the databases and many more stuff

## main point

The main use of the rotate secret is that - it will run the lambda function according to the time we specified and after that it will generate the new secret key

# AWS - SDK allows us to access all the things in the function

so we need to use the lambda and to access the secret inside the lambda function , what we need to do is to define the role and the policy
so that lambda function could access all these things.
