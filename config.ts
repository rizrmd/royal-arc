import { BaseConfig } from "./pkgs/royal/config";

export default BaseConfig({
  default: {
    dev: {
      "web": {
        url: "http://localhost:4500",
      },
      "srv": {
        url: "http://localhost:4500",
      },
    },
    prod: {
      "web": {
        url: "http://localhost:4500",
      },
      "srv": {
        url: "http://localhost:4500",
      },
    },
    staging: {
      "web": {
        url: "http://localhost:4500",
      },
      "srv": {
        url: "http://localhost:4600",
      },
    },
  },
});

// this will be generated if set to empty string
export const DeployKey = `\
MIIC3TBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIQQzPyRswu94CAggA
MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBBUriUufxVYfMv1ZkV6+rN7BIIC
gGiNsbMXdrXOZRtEH6+NoOIrgtSwI5rHv8eiX26hctdtcsEdJlW2rlnXT9+AJ2cv
erjEV0bllVwDtCuQyPZBMlSsVNQEaoPSI3X+vEq2vFOIbyytuMfu3A8V4pCosrHA
0NH2VMyeAwXzkIqkJH+v/O44CdP2kLhwDTYQWj2Q7kpDUpiYfpBWxbKjHsSDJWa9
YA7LMMOXn1wv4O6Mjd2SzhmAjL1TBxdT5oA0OIIZNB7Q9O5zu4yieqHsBM3VyEuM
kNhnw3afB86kyqZ317MKGZPs3pzETbzXZOxt/VrnJRHyTz55woaryubGuC0/6nB0
5W49cdzvTjnmVKZiFh+LyeDBVVdwia2CrNMsXnBsx4yuLpoyK1idW4j1AGDPsTAS
pkjp4IH6BYCvmZgE5AldlV9tfa7sMQqoHIBipJN7oYHZEoZ/cDEG4RBmSKi0TYn+
SCV4QmCINdGTylLILCFE9gwTam+rqZmnjbB6TqoV5Pg8gV/n2qX/fczDhbVPbIPW
QI56xfJIrOBRc5b6kCaCuZyWrfAiN+6np6zctoTXVDRkSTql1WIE8t7P9aUcxHiu
TgzrIh5c9Slavl+W8CQrHDOEyuIQjMB+zV2QeEoR4zju2mlmc1RTiN2bXsgkawMS
X1qdEGBp1IUUeAldkdrH1KhxKtCs2GjuvaQPNKxjmLGJbZucU9hNI8A3m8IaBqwv
O4YPfxjQBHqljad6ICU8KDtIbOeNfJRQ0NdpHsyB1VQ2rqhE5nNSzp3WE3sJaFD5
9uW5BS0LNmjWHkOJOc2qSKihXPg27Mp/gRBfj7sBp8Om5JAETlI74Mq/YvjbY1nc
+Dtea0w7JBXv8Q0abveKz70=`;
