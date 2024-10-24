import React from 'react';

const Profile: React.FC = () => {
    const mockData = {
        userId: 1,
        userAvatar: "https://picsum.photos/350/300",
        catAvatar: "https://picsum.photos/300/300",
        username: "Cat Lady",
        bio: "Love cats. ????", 
        yarn: 100,
        memberSince: "November 2024",
        info1: "Gold Member",
        info2: "What should go here?"       
    };

    //password change call, will change to api call
    const handleChangePassword = () => {
        alert(`password change!`);
    };

    //bio change call, will change to api call
    const handleChangeBio = () => {
        console.log(`bio change!`);
    };

    //username change call, will change to api call
    const handleChangeUsername = () => {
        console.log(`username change!`);
    }

    return (
        <div className="container mx-auto p-6 rounded-lg bg-color_1">
            <div className="md:flex md:space-x-6">
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                    <img src={mockData.userAvatar} alt="User Avatar" className="w-full h-auto rounded-lg shadow-lg mb-4"/>
                    <div className="p-4 rounded-lg shadow bg-color_2">
                        <p><strong>Yarn:</strong> {mockData.yarn}</p>
                        <p><strong>Member Since:</strong> {mockData.memberSince}</p>
                        <p><strong>Info 1:</strong> {mockData.info1}</p>
                        <p><strong>Info 2:</strong> {mockData.info2}</p>
                    </div>
                </div>
                <div className="w-full md:w-2/3">
                    <div className="p-6 rounded-lg shadow-lg mb-6 bg-color_2">
                        <h1 className="text-2xl font-semibold mb-2 bg-">{mockData.username}</h1>
                        <p><strong>Bio:</strong> {mockData.bio}</p>
                    </div>
                    <div className="space-x-0 space-y-4 md:space-y-4 md:space-x-4">
                        <button onClick={handleChangePassword} className="ml-2 px-4 py-2 bg-color_3 rounded-lg hover:bg-color_5 transition-colors md:w-auto">
                            Change Password</button>
                        <button onClick={handleChangeBio} className="ml-2 px-4 py-2 bg-color_3 text-white rounded-lg hover:bg-color_5 transition-colors md:w-auto">
                            Change Bio</button>
                        <button onClick={handleChangeUsername} className="ml-2 px-4 py-2 bg-color_3 text-white rounded-lg hover:bg-color_5 transition-colors md:w-auto">
                            Change Username</button>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default Profile;