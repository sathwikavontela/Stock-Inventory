import { FIC } from "../models/fic.model.js";
import RequestForm from "../models/request.model.js";
import { User } from "../models/user.model.js";

const createRequestForm = async (req, res) => {
  const { items } = req.body;
  //console.log(req.user);
  // console.log(items)
  const userId = req.user._id;
  //console.log(userId)

  try {
    if (!items || !userId) {
      return res.status(400).json({ message: "All fileds are required" });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not authorised" });
    }
    const newrequest = await RequestForm.create({ items, userId });
    //console.log(newrequest)
    if (!newrequest) {
      return res.status(400).json({ message: "Error while requesting items" });
    }
    const populatedRequest = await RequestForm.findById(
      newrequest._id
    ).populate("userId");

    return res.status(200).json({ populatedRequest });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getRequestForms = async (req, res) => {
  try {
    // console.log("dfhdjdd");
    const userId = req.user._id;
    //console.log(userId);
    if (!userId) {
      return res.status(400).json({ message: "user not authorised" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const requests = await RequestForm.find({});
    if (!requests) {
      return res.status(400).json({ message: "Error while fetching requests" });
    }
    //console.log(requests)
    return res.status(200).json({ requests });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

const getRequestFormsForFic = async (req, res) => {
  try {
    // console.log("dfhdjdd");
    //console.log(userId);
    const requests = await RequestForm.find({});
    if (!requests) {
      return res.status(400).json({ message: "Error while fetching requests" });
    }
    requests.reverse();
    //console.log(requests)
    return res.status(200).json({ requests });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

const getRequestFormsForAuthority = async (req, res) => {
  try {
    const requests = await RequestForm.find({})
      .populate("userId") // Populate the entire user document
      .exec(); // Execute the query
    requests.reverse();
    if (!requests) {
      return res
        .status(400)
        .json({ message: "Error while fetching the requests" });
    }
    return res.status(200).json({ requests: requests });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getRequestsForDepartments = async (req, res) => {
  try {
    const userId = req.user._id;
    // console.log(userId)
    if (!userId) {
      return res.status(400).json({ message: "user not authorised" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const requests = await RequestForm.find({ userId });
    if (!requests) {
      return res.status(400).json({ message: "Error while fetching requests" });
    }
    //console.log(requests)
    return res.status(200).json({ requests });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

const getDepartmentReportsForFic = async (req, res) => {
  const { id } = req.params; // Get department ID from route params

  try {
    // Fetch reports from the database, including only the necessary fields
    const reports = await RequestForm.find({ userId: id })
      .select("items status") // Select only the 'items' and 'status' fields
      .lean(); // .lean() returns plain JavaScript objects for better performance

    if (!reports || reports.length === 0) {
      return res
        .status(404)
        .json({ message: "No reports found for this department." });
    }

    // Map through the reports and format the items array
    const formattedReports = reports.map((report) => {
      return {
        status: report.status,
        items: report.items.map((item) => ({
          itemName: item.item, // Item name
          quantity: item.quantity, // Quantity
          approved: item.status === "Approved", // Approval status based on item status
        })),
      };
    });

    res.status(200).json({ reports: formattedReports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Could not fetch reports." });
  }
};

const getRequestFormById = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log(orderId);
    const request = await RequestForm.findById(orderId).populate("userId");
    if (!request) {
      return res.status(400).json({ message: "Request not found" });
    }
    return res.status(200).json({ request });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getApprovedRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    // console.log(userId)
    if (!userId) {
      return res.status(400).json({ message: "user not authorised" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const requests = await RequestForm.find({ userId, status: "Approved" });
    if (!requests) {
      return res.status(400).json({ message: "Error while fetching requests" });
    }
    //console.log(requests)
    return res.status(200).json({ requests });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const requestId = req.params.orderId;
    console.log(requestId);
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "status not found" });
    }
    const updatedRequest = await RequestForm.findByIdAndUpdate(
      requestId,
      { status },
      { new: true, runValidators: true }
    );
    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found." });
    }
    res
      .status(200)
      .json({ message: "Status updated successfully.", data: updatedRequest });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  createRequestForm,
  getRequestForms,
  getRequestFormById,
  getRequestsForDepartments,
  getApprovedRequests,
  getRequestFormsForFic,
  getRequestFormsForAuthority,
  getDepartmentReportsForFic,
  updateStatus,
};
