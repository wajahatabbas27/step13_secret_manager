"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example01RotateSecretWithLambdaStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const secretmanager = require("aws-cdk-lib/aws-secretsmanager");
const lambda = require("aws-cdk-lib/aws-lambda");
const iam = require("aws-cdk-lib/aws-iam");
class Example01RotateSecretWithLambdaStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
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
                REGION: aws_cdk_lib_1.Stack.of(this).region,
                SECRET_NAME: "example-secret",
                KEY_IN_SECRET_NAME: "SecretKey"
            }
        });
        //putting rotation schedule on secret
        secret.addRotationSchedule("RotationSchedule", {
            rotationLambda: lambdaFn,
            automaticallyAfter: aws_cdk_lib_1.Duration.hours(24) // 24 hours bad rotate krdo secret ko 
        });
        //secret ka access derhe hain lambda function ko 
        secret.grantRead(lambdaFn);
        //lambda function ko grant invoke krrhe hain secret ka 
        lambdaFn.grantInvoke(new iam.ServicePrincipal('secretsmanager.amazonaws.com')); //lambda function ko access dedia hai hmne secret manager ka iam roles ke through 
        //policy bna rhe hain secret ko use krne ke liye lambda function mein take secret put krein lambda function ke andar
        lambdaFn.addToRolePolicy(new iam.PolicyStatement({
            resources: [secret.secretArn],
            actions: ['secretmanager:PutSecretValue'] //actions ke andar hm bta rhe hain lambda function put krega secret value ko
        }));
    }
}
exports.Example01RotateSecretWithLambdaStack = Example01RotateSecretWithLambdaStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZTAxX3JvdGF0ZV9zZWNyZXRfd2l0aF9sYW1iZGEtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleGFtcGxlMDFfcm90YXRlX3NlY3JldF93aXRoX2xhbWJkYS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBMEQ7QUFFMUQsZ0VBQWdFO0FBQ2hFLGlEQUFpRDtBQUNqRCwyQ0FBMkM7QUFHM0MsTUFBYSxvQ0FBcUMsU0FBUSxtQkFBSztJQUM3RCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLGlCQUFpQjtRQUNqQixNQUFNLE1BQU0sR0FBRyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUN0RCxXQUFXLEVBQUUsV0FBVztZQUN4QixVQUFVLEVBQUUsZ0JBQWdCO1lBQzVCLG9CQUFvQixFQUFFO2dCQUNwQixvQkFBb0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztnQkFDeEMsaUJBQWlCLEVBQUUsV0FBVzthQUMvQjtTQUNGLENBQUMsQ0FBQztRQUVILDREQUE0RDtRQUM1RCxNQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUN6RCxZQUFZLEVBQUUsc0JBQXNCO1lBQ3BDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxPQUFPLEVBQUUsZUFBZTtZQUN4QixXQUFXLEVBQUU7Z0JBQ1gsTUFBTSxFQUFFLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU07Z0JBQzdCLFdBQVcsRUFBRSxnQkFBZ0I7Z0JBQzdCLGtCQUFrQixFQUFFLFdBQVc7YUFDaEM7U0FDRixDQUFDLENBQUM7UUFFSCxxQ0FBcUM7UUFDckMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixFQUFFO1lBQzdDLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLGtCQUFrQixFQUFFLHNCQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFzQixzQ0FBc0M7U0FDbkcsQ0FBQyxDQUFDO1FBRUgsaURBQWlEO1FBQ2pELE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0IsdURBQXVEO1FBQ3ZELFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFBLENBQWUsa0ZBQWtGO1FBRS9LLG9IQUFvSDtRQUNwSCxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQztZQUMvQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLDhCQUE4QixDQUFDLENBQWtDLDRFQUE0RTtTQUN4SixDQUFDLENBQUMsQ0FBQTtJQUlMLENBQUM7Q0FDRjtBQWhERCxvRkFnREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEdXJhdGlvbiwgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCAqIGFzIHNlY3JldG1hbmFnZXIgZnJvbSAnYXdzLWNkay1saWIvYXdzLXNlY3JldHNtYW5hZ2VyJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGlhbSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcblxuXG5leHBvcnQgY2xhc3MgRXhhbXBsZTAxUm90YXRlU2VjcmV0V2l0aExhbWJkYVN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vY3JlYXRpbmcgc2VjcmV0XG4gICAgY29uc3Qgc2VjcmV0ID0gbmV3IHNlY3JldG1hbmFnZXIuU2VjcmV0KHRoaXMsIFwiU2VjcmV0XCIsIHtcbiAgICAgIGRlc2NyaXB0aW9uOiBcIk15IFNlY3JldFwiLFxuICAgICAgc2VjcmV0TmFtZTogXCJleGFtcGxlLXNlY3JldFwiLFxuICAgICAgZ2VuZXJhdGVTZWNyZXRTdHJpbmc6IHtcbiAgICAgICAgc2VjcmV0U3RyaW5nVGVtcGxhdGU6IEpTT04uc3RyaW5naWZ5KHt9KSxcbiAgICAgICAgZ2VuZXJhdGVTdHJpbmdLZXk6IFwiU2VjcmV0S2V5XCJcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vY3JlYXRpbmcgbGFtYmRhIGZ1bmN0aW9uIHRvIHJvdGF0ZSB0aGUgc2VjcmV0IHdoZW4gY2FsbGVkIFxuICAgIGNvbnN0IGxhbWJkYUZuID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcInNlY3JldExhbWJkYVwiLCB7XG4gICAgICBmdW5jdGlvbk5hbWU6IFwic2VjcmV0TGFtYmRhRnVuY3Rpb25cIixcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMl9YLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSxcbiAgICAgIGhhbmRsZXI6IFwiaW5kZXguaGFuZGxlclwiLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgUkVHSU9OOiBTdGFjay5vZih0aGlzKS5yZWdpb24sXG4gICAgICAgIFNFQ1JFVF9OQU1FOiBcImV4YW1wbGUtc2VjcmV0XCIsXG4gICAgICAgIEtFWV9JTl9TRUNSRVRfTkFNRTogXCJTZWNyZXRLZXlcIlxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy9wdXR0aW5nIHJvdGF0aW9uIHNjaGVkdWxlIG9uIHNlY3JldFxuICAgIHNlY3JldC5hZGRSb3RhdGlvblNjaGVkdWxlKFwiUm90YXRpb25TY2hlZHVsZVwiLCB7XG4gICAgICByb3RhdGlvbkxhbWJkYTogbGFtYmRhRm4sXG4gICAgICBhdXRvbWF0aWNhbGx5QWZ0ZXI6IER1cmF0aW9uLmhvdXJzKDI0KSAgICAgICAgICAgICAgICAgICAgICAvLyAyNCBob3VycyBiYWQgcm90YXRlIGtyZG8gc2VjcmV0IGtvIFxuICAgIH0pO1xuXG4gICAgLy9zZWNyZXQga2EgYWNjZXNzIGRlcmhlIGhhaW4gbGFtYmRhIGZ1bmN0aW9uIGtvIFxuICAgIHNlY3JldC5ncmFudFJlYWQobGFtYmRhRm4pO1xuXG4gICAgLy9sYW1iZGEgZnVuY3Rpb24ga28gZ3JhbnQgaW52b2tlIGtycmhlIGhhaW4gc2VjcmV0IGthIFxuICAgIGxhbWJkYUZuLmdyYW50SW52b2tlKG5ldyBpYW0uU2VydmljZVByaW5jaXBhbCgnc2VjcmV0c21hbmFnZXIuYW1hem9uYXdzLmNvbScpKSAgICAgICAgICAgICAgIC8vbGFtYmRhIGZ1bmN0aW9uIGtvIGFjY2VzcyBkZWRpYSBoYWkgaG1uZSBzZWNyZXQgbWFuYWdlciBrYSBpYW0gcm9sZXMga2UgdGhyb3VnaCBcblxuICAgIC8vcG9saWN5IGJuYSByaGUgaGFpbiBzZWNyZXQga28gdXNlIGtybmUga2UgbGl5ZSBsYW1iZGEgZnVuY3Rpb24gbWVpbiB0YWtlIHNlY3JldCBwdXQga3JlaW4gbGFtYmRhIGZ1bmN0aW9uIGtlIGFuZGFyXG4gICAgbGFtYmRhRm4uYWRkVG9Sb2xlUG9saWN5KG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHsgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lhbSBrZSB0aHJvdWdoIHBvbGljeSBibmFpIGhhaSBcbiAgICAgIHJlc291cmNlczogW3NlY3JldC5zZWNyZXRBcm5dLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzb3VyY2UgYnRhIHJoZSBoYWluIGhtIHBvbGljeSBrZSBhbmRhciBqbyBrZSBzZWNyZXQgaGFpXG4gICAgICBhY3Rpb25zOiBbJ3NlY3JldG1hbmFnZXI6UHV0U2VjcmV0VmFsdWUnXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2FjdGlvbnMga2UgYW5kYXIgaG0gYnRhIHJoZSBoYWluIGxhbWJkYSBmdW5jdGlvbiBwdXQga3JlZ2Egc2VjcmV0IHZhbHVlIGtvXG4gICAgfSkpXG5cblxuXG4gIH1cbn1cbiJdfQ==