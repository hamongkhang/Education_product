import React from 'react';
import AboutItem from './aboutItem';

const arr = [
    {
        title: 'Giảng viên',
        image: 'http://localhost:8000/upload/images/about_1.png',
        data: 'Với đội ngũ giáo viên giàu tình yêu thương, sự tận tâm và sáng tạo. Ngoài ra, để đảm bảo các con phát triển một cách toàn diện và tốt nhất, các cô giáo còn có nghiệp vụ chuyên môn xuất sắc, giàu kinh nghiệm và đầy tâm huyết.',
    },
    {
        title: 'Môi trường',
        image: 'http://localhost:8000/upload/images/about_2.png',
        data: 'Môi trường học tập hiện đại, tích hợp nhiều công nghệ tiên tiến trong quá trình giảng dạy, đội ngũ hỗ trợ mọi lúc mọi nơi, có nhiều kinh nghiệm trong việc tư vấn và hỗ trợ khách hàng. ',
    },
    {
        title: 'Giáo trình',
        image: 'http://localhost:8000/upload/images/about_3.png',
        data: 'Giáo trình được cập nhập thường xuyên đảm bảo kiến thức không bị cũ, có nhiều bài tập hỗ trợ cho việc rèn luyện kĩ năng trong quá trình học, các bài giảng dễ hiểu, chuyên sâu và đa dạng.',
    },
];

const About = (props) => {
    return (
        <div className="w-full object-cover rounded-lg overflow-hidden">
            <h3 className="text-center font-semibold text-3xl text-yellow-600 uppercase mb-10">
                Tạo sao nên chọn vật lý 365?
            </h3>
            <div className="grid grid-cols-1 sm1:grid-cols-2 sm:grid-cols-3 gap-2 lg:gap-5">
                {arr.map((item, index) => (
                    <AboutItem {...item} />
                ))}
            </div>
        </div>
    );
};
export default About;
