import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as lambda from 'aws-cdk-lib/aws-lambda'

export class Example00CreateAutoSecretStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //Making Secret
    const secret = new secretsmanager.Secret(this, "Secret");

    //using the secret in the lambda function by using the environment variables and by using the method of .fromSecretAttributes()

    const lambdaFn = new lambda.Function(this, `ExampleLambdaAssetFn`, {
      code: lambda.Code.fromInline('exports.handler = function(event, ctx, cb) { console.log("SECRET_KEY", process.env.EXAMPLE_SECRET_KEY); return cb(null, "hi"); }'),
      runtime: lambda.Runtime.NODEJS_12_X,
      // role: role,
      environment: {
        EXAMPLE_SECRET_KEY: `${secretsmanager.Secret.fromSecretAttributes(this, "ExampleSecretKey", {
          secretPartialArn: secret.secretArn
        }).secretValue
          }`
      },
      handler: "index.handler",
    })

  }
}
