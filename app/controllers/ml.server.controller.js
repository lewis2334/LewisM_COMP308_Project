const tf = require('@tensorflow/tfjs');
//const tf = require('@tensorflow/tfjs-node');


const modelSaveLocation = "./app/ml/model/heart_disease/model.json";

exports.heartDiseasePredict = async (req, res) => {
  let data = req.body;
  console.log(data);

  console.log("Loading model...");

  
  const model = await tf.loadLayersModel("http://localhost:3000/model.json");
  //const model = await tf.loadLayersModel(`file://` + modelSaveLocation);
 
  console.log("Model loaded", model);
  const testData = [req.body];

  console.log("Testing data", testData);

  const testingData = tf.tensor2d(
    testData.map((attr) => [
      attr.age,
      attr.cp,
      attr.sex,
      attr.trestbps,
      attr.chol,
      attr.thalach,
      attr.fbs,
      attr.exang,
    ])
  );

  const results = model.predict(testingData);

  // print results
  console.log
  results.array().then((array) => {
    res.json(array[0][0]);
  });
};
