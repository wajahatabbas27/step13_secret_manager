# Secrets

There are secrets, which we can add and use them
Secrets are created and used in the lambda function as well by using the environment variables
The Secret , we have created can now be used in the lambda function , that we have created in the stack and thats how we can manage the secrets all the way in the stack file by creating the secret using the secret manager and then managing it

## Creating Secret

Firstly we can create secret by using the random value e.g by DynamoDb to access it or by creating a secret by the Secret Manager of the Aws
which could be complex String

In the Secret Manager - When we generate the secret - It will automatically generate the secret and we can access it

## code to generate the secret is :

const secret1 = new secretsmanager.Secret(this,"Secret!",{
secretName : "NewSecret"
});

Its the secret that we created - now we can access it and use it anywhere we wanted as in this step we are using it in the lambda function

If we donot provide the name of the secret , AWS by itself will generate the name of the secret by itself.If we provide the secret name , we can access it by using the fromSecretNameV2().

If we donot provide the secret name then by using the .fromSecretAttributes() from the Arn - we will going to access it and use it.

## ARN stands for ---- Amazon Resource Name

Secret Parial Arn ke through secretArn the code call krrehe hain lambda mein environment variables ke throug
here in the code secret partial arn will return the secret.secretArn through :

environment: {
EXAMPLE_SECRET_KEY: `${secretsmanager.Secret.fromSecretAttributes(this, "ExampleSecretKey", { secretPartialArn: secret.secretArn }).secretValue }`
},
handler: "index.handler",
})
