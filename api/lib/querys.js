exports.searchQuery = (
  model,
  { queryFields, anyFields, exactFields, sorts },
  query,
  fields
) => {
  queryFields = queryFields || [];
  anyFields = anyFields || [];
  exactFields = exactFields || [];
  let searchSpecs = [];
  if (query) {
    searchSpecs.push({
      $or: queryFields.map((name) => ({
        [name]: { $regex: query, $options: 'i' },
      })),
    });
  }
  for (let field of anyFields) {
    let val = fields[field];
    if (typeof val === 'undefined') {
      continue;
    }
    val = typeof val === 'string' ? val.trim().split(',') : val;
    searchSpecs.push({ [field]: { $in: val } });
  }
  for (let field of exactFields) {
    let val = fields[field];
    if (typeof val === 'undefined') {
      continue;
    }
    val = typeof val === 'string' ? val.trim().split(',') : val;
    searchSpecs.push({ [field]: val });
  }
  let findOpts = {};
  if (searchSpecs.length > 0) {
    findOpts = { $and: searchSpecs };
  }
  let sort = [Object.values(sorts)[0]];
  if (fields.sortBy) {
    let usedSorts = fields.sortBy
      .trim()
      .split(',')
      .filter((s) => s in sorts);
    sort = usedSorts.map((sortName) => sorts[sortName]);
  }
  return model.find(findOpts).sort(sort);
};

exports.execUpdateQuery = async (
  model,
  { setParams, setRefFuncs },
  object,
  params
) => {
  let updateParams = {};
  for (let param of setParams) {
    if (param in params) {
      updateParams[param] = params[param];
    }
  }
  for (let param in setRefFuncs) {
    if (param in params) {
      let refObjs = params[param];
      if (typeof refObjs === 'string') {
        refObjs = refObjs.split(',').map((refId) => ({ _id: refId }));
      }
      object = await setRefFuncs[param](object, refObjs);
    }
  }
  let objUpdated = await model.updateOne(
    { _id: object._id },
    { $set: updateParams },
    { new: true }
  );
  return objUpdated;
};

exports.execUpdateSetManyToMany = async (
  primaryModel,
  secondaryKeyOfPrimary,
  primaryObj,
  secondaryModel,
  primaryKeyOfSecondary,
  secondaryObjects
) => {
  let updatedPrimaryObj = await primaryModel.findByIdAndUpdate(
    primaryObj._id,
    { [primaryKeyOfSecondary]: secondaryObjects },
    { new: true, useFindAndModify: false }
  );
  if (secondaryKeyOfPrimary) {
    await secondaryModel.updateMany(
      {},
      { $pull: { [secondaryKeyOfPrimary]: primaryObj._id } }
    );
  }
  await Promise.all(
    secondaryObjects.map((sObj) =>
      secondaryModel.findByIdAndUpdate(
        sObj._id,
        { $addToSet: { [secondaryKeyOfPrimary]: primaryObj._id } },
        { new: true, useFindAndModify: false }
      )
    )
  );
  return updatedPrimaryObj;
};

exports.execUpdateSetManyToOne = async (
  oneModel,
  manyKeyOfOne,
  oneObj,
  manyModel,
  oneKeyOfMany,
  manyObjs
) => {
  if (manyKeyOfOne) {
    await Promise.all(
      manyObjs.map(async (manyObj) => {
        await manyModel.updateOne(
          { _id: manyObj._id },
          { $set: { [manyKeyOfOne]: oneObj._id } },
          { new: true }
        );
      })
    );
  }
  let updatedOneModel = await oneModel.findByIdAndUpdate(
    oneObj._id,
    { $set: { [oneKeyOfMany]: manyObjs.map((fl) => fl._id) } },
    { new: true, useFindAndModify: false }
  );
  return updatedOneModel;
};
