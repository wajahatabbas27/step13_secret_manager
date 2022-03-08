import { SecretsManager } from "aws-sdk";
import { randomBytes } from "crypto";


const secretName = process.env.SECRET_NAME || "";
const keyInSecret = process.env.KEY_IN_SECRET_NAME || "";
const secretManager = new SecretsManager({
    region: process.env.REGION || "us-east-2"
})

interface Event {
    SecretId: string
    ClientRequestToken: string
    Step: 'createSecret' | 'setSecret' | 'testSecret' | 'finishSecret'
}

exports.handler = async (event: Event) => {
    if (event.Step === 'createSecret') {
        await secretManager.putSecretValue({
            SecretId: secretName,
            SecretString: JSON.stringify({
                [keyInSecret]: randomBytes(32).toString('hex')
            }),
            VersionStages: ['AWSCURRENT']
        }).promise()
    }
}