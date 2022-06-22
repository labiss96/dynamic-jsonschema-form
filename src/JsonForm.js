import React, { useState } from "react";
import Form from "./react-jsonschema-form/components/Form";

const JsonForm = (props) => {
  const [data, setData] = useState({
    // component: "Channel",
    // channelForm: {
    //   channelId: "groovy",
    //   groovyForm: {
    //     rscPathName: "rsc-path",
    //     scriptFile: "file-1",
    //   },
    // },
  });

  const schema = {
    // definitions: {
    //   channels: {
    //     type: "object",
    //     properties: {
    //       channelId: {
    //         type: "string",
    //         enum: ["groovy", "ch-2", "ch-3"],
    //       },
    //     },
    //     dependencies : {
    //       channelId: {
    //         oneOf: [
    //           {
    //             properties: {
    //               channelId: {
    //                 enum: ["groovy"],
    //               },
    //               groovyForm: {
    //                 $ref: "@/definitions/groovys",
    //               },
    //             },
    //           },
    //         ],
    //       },
    //     }
    //   },
    //   groovys: {
    //     type: "object",
    //     properties: {
    //       rscPathName: {
    //         type: "string",
    //       },
    //       scriptFile: {
    //         type: "string",
    //       },
    //     },
    //   },
    // },
    title: "From Component",
    type: "object",
    properties: {
      component: {
        type: "string",
        enum: ["Direct", "FTP", "Channel"],
        default: "Direct",
      },
    },
    required: ["component"],
    dependencies: {
      component: {
        oneOf: [
          {
            properties: {
              component: {
                enum: ["Direct"],
              },
              Second: {
                type: "number",
              },
            },
            required: ["Second"],
          },
          {
            properties: {
              component: {
                enum: ["FTP"],
              },
              "FTP Service": {
                type: "string",
              },
            },
            required: ["FTP Service"],
          },
          {
            properties: {
              component: {
                enum: ["Channel"],
              },
              channelForm: {
                $ref: "@/definitions/channels",
              },
            },
          },
        ],
      },
    },
  };

  const getSchemaDefinition = (ref) => {
    switch (ref) {
      case "/definitions/groovys":
        return {
          properties: {
            rscPathName: {
              type: "string",
            },
            scriptFile: {
              type: "string",
            },
          },
        };
      case "/definitions/channels":
        return {
          properties: {
            channelId: {
              type: "string",
              enum: ["groovy", "EDI-INT", "IBN Agent"],
            },
          },
          dependencies: {
            channelId: {
              oneOf: [
                {
                  properties: {
                    channelId: {
                      enum: ["groovy"],
                    },
                    groovyForm: {
                      $ref: "@/definitions/groovys",
                    },
                  },
                },
              ],
            },
          },
        };
      default:
        return {};
    }
  };

  return (
    <div className="container">
      <Form
        schema={schema}
        formData={data}
        onChange={({ formData }, e) => {
          console.log(formData);
        }}
        onRetrieveSchema={getSchemaDefinition}
      />
    </div>
  );
};

export default JsonForm;
