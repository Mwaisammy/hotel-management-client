import { Shield, Award, Users, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Trusted Platform",
      description:
        "Secure booking with verified hotels and trusted payment methods",
    },
    {
      icon: Award,
      title: "Best Quality",
      description:
        "Curated selection of top-rated hotels with excellent service standards",
    },
    {
      icon: Users,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support to assist you with any queries",
    },
    {
      icon: MapPin,
      title: "Global Reach",
      description:
        "Thousands of hotels worldwide in popular and exotic destinations",
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Discover Excellence in Hospitality.
                <span className="block text-primary">
                  Trusted Hotels You Can Rely On
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Experience unparalleled comfort and service with our carefully
                selected network of premium hotels. From luxury resorts to
                boutique accommodations, we ensure every stay exceeds your
                expectations.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border-none shadow-none bg-transparent"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Hotel Room"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <img
                  src="/placeholder.svg?height=150&width=200"
                  alt="Hotel Lobby"
                  className="w-full h-36 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="/placeholder.svg?height=150&width=200"
                  alt="Hotel Pool"
                  className="w-full h-36 object-cover rounded-lg"
                />
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Hotel Restaurant"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
