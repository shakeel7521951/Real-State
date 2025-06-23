import Property from "../models/Property.js";

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
export const getAllProperties = async (req, res, next) => {
  try {
    const properties = await Property.find().populate({
      path: "user",
      select: "name email",
    });

    const formattedProperties = properties.map((property) => ({
      id: property._id,
      title: property.title,
      location: property.location,
      price: property.price,
      description: property.description,
      space: property.space,
      bathCount: property.bathCount,
      forSale: property.forSale,
      images: property.images,
      owner: property.user
        ? {
            id: property.user._id,
            name: property.user.name,
            email: property.user.email,
          }
        : null,
      createdAt: property.createdAt,
    }));

    res.status(200).json({
      success: true,
      count: properties.length,
      data: formattedProperties,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
export const getProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id).populate({
      path: "user",
      select: "name email",
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: property._id,
        title: property.title,
        location: property.location,
        price: property.price,
        description: property.description,
        space: property.space,
        bathCount: property.bathCount,
        forSale: property.forSale,
        images: property.images,
        owner: property.user
          ? {
              id: property.user._id,
              name: property.user.name,
              email: property.user.email,
            }
          : null,
        createdAt: property.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create property
// @route   POST /api/properties
// @access  Private
export const createProperty = async (req, res, next) => {
  try {
    // Add user to property
    req.body.user = req.user.id;

    const property = await Property.create(req.body);

    // Format the response to match the format expected by the frontend
    const formattedProperty = {
      id: property._id,
      title: property.title,
      location: property.location,
      price: property.price,
      description: property.description,
      space: property.space,
      bathCount: property.bathCount,
      forSale: property.forSale,
      images: property.images,
      owner: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
      },
      createdAt: property.createdAt,
    };

    res.status(201).json({
      success: true,
      data: formattedProperty,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private
export const updateProperty = async (req, res, next) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Make sure user is property owner or admin
    if (property.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this property",
      });
    }
    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate({
      path: "user",
      select: "name email",
    });

    // Format the response to match the format expected by the frontend
    const formattedProperty = {
      id: property._id,
      title: property.title,
      location: property.location,
      price: property.price,
      description: property.description,
      space: property.space,
      bathCount: property.bathCount,
      forSale: property.forSale,
      images: property.images,
      owner: property.user
        ? {
            id: property.user._id,
            name: property.user.name,
            email: property.user.email,
          }
        : null,
      createdAt: property.createdAt,
    };

    res.status(200).json({
      success: true,
      data: formattedProperty,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private
export const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Make sure user is property owner or admin
    if (property.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this property",
      });
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
