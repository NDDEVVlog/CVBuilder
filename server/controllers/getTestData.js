
export const getData = async (req, res) => {
    console.log('Serving profile data:', storedProfileData);
  
    // Return the stored profile data (previously received via POST)
    return res.status(200).json(storedProfileData);
  };

