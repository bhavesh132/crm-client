import React, { useState, useEffect } from 'react';
import Loader from '../pages/generics/Loader';
import { axiosInstance } from './utils';

const instanceDetails = ({ appLabel, modelName, objectId }) => {
    const [instanceDetails, setInstanceDetails] = useState(null);

    useEffect(() => {
        const fetchInstanceDetails = async () => {
            try {
                const response = await axiosInstance.get(`auth/instance-detail/${appLabel}/${modelName}/${objectId}/`);
                console.log(response)
                setInstanceDetails(response.data.data);
            } catch (error) {
                console.error('Error fetching instance details:', error);
            }
        };

        fetchInstanceDetails();
    }, [modelName, objectId]);

    if (!instanceDetails) {
        return <div><Loader /></div>;
    }

    return instanceDetails;
};

export default instanceDetails