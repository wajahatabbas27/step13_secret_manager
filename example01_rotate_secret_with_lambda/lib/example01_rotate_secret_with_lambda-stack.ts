import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as secretmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';


export class Example01RotateSecretWithLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //creating secret
    const secret = new secretmanager.Secret(this, "Secret", {
      description: "My Secret",
      secretName: "example-secret",
      generateSecretString: {
        secretStringTemplate: JSON.stringify({}),
        generateStringKey: "SecretKey"
      }
    });

    //creating lambda function to rotate the secret when called 
    const lambdaFn = new lambda.Function(this, "secretLambda", {
      functionName: "secretLambdaFunction",
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: "index.handler",
      environment: {
        REGION: Stack.of(this).region,
        SECRET_NAME: "example-secret",
        KEY_IN_SECRET_NAME: "SecretKey"
      }
    });

    //putting rotation schedule on secret
    secret.addRotationSchedule("RotationSchedule", {
      rotationLambda: lambdaFn,
      automaticallyAfter: Duration.hours(24)                      // 24 hours bad rotate krdo secret ko 
    });

    //secret ka access derhe hain lambda function ko 
    secret.grantRead(lambdaFn);

    //lambda function ko grant invoke krrhe hain secret ka 
    lambdaFn.grantInvoke(new iam.ServicePrincipal('secretsmanager.amazonaws.com'))               //lambda function ko access dedia hai hmne secret manager ka iam roles ke through 

    //policy bna rhe hain secret ko use krne ke liye lambda function mein take secret put krein lambda function ke andar
    lambdaFn.addToRolePolicy(new iam.PolicyStatement({                           //iam ke through policy bnai hai 
      resources: [secret.secretArn],                                             //resource bta rhe hain hm policy ke andar jo ke secret hai
      actions: ['secretmanager:PutSecretValue']                                  //actions ke andar hm bta rhe hain lambda function put krega secret value ko
    }))



  }
}
