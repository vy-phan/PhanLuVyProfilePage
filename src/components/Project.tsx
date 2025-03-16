import GridMotion from "./GridMotion";

const Project = () => {
    const items = [
        'https://i.imgur.com/9H1SkWF.png',
        'https://i.imgur.com/MSIpitt.png',
        'https://i.imgur.com/A2hXF3H.png',
        'https://i.imgur.com/9H1SkWF.png',
        'https://i.imgur.com/36WyKdt.png',
        'https://i.imgur.com/36WyKdt.png',
        'https://i.imgur.com/36WyKdt.png',
        'https://i.imgur.com/36WyKdt.png',
        'https://i.imgur.com/KWOPtBY.png',
        'https://i.imgur.com/5zXavTU.png',
        'https://i.imgur.com/NASXupL.png',
        'https://i.imgur.com/kDvOiCv.png',
        'https://i.imgur.com/9H1SkWF.png',
        'https://i.imgur.com/9H1SkWF.png',
        'https://i.imgur.com/36WyKdt.png',
        'https://i.imgur.com/kDvOiCv.png',
        'https://i.imgur.com/9H1SkWF.png',
        'https://i.imgur.com/A2hXF3H.png',
        'https://i.imgur.com/KWOPtBY.png',
        'https://i.imgur.com/MSIpitt.png',
        'https://i.imgur.com/36WyKdt.png',
        'https://i.imgur.com/36WyKdt.png',
       'https://i.imgur.com/36WyKdt.png',
    ];

    return (
        <>
            <GridMotion items={items as string[]} />
        </>
    )
}

export default Project
