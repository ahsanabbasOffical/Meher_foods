'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'Ahmed Khan',
    role: 'Home Chef',
    content: 'The spices from Meher Foods are authentic and fresh. My biryani has never tasted better!',
    avatar: '/placeholder-user.jpg',
  },
  {
    name: 'Fatima Ali',
    role: 'Restaurant Owner',
    content: 'Reliable delivery and premium quality. My customers love the flavors!',
    avatar: '/placeholder-user.jpg',
  },
  {
    name: 'Omar Hassan',
    role: 'Food Blogger',
    content: 'Meher Foods has become my go-to for all spice needs. Exceptional quality and service.',
    avatar: '/placeholder-user.jpg',
  },
];

export function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <Avatar className="mx-auto mb-4">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
