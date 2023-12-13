import { ArrowBigUp, AxeIcon, Fingerprint, LockIcon } from "lucide-react";
const features = [
  {
    name: "Live Proctoring",
    description:
      "Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.",
    icon: LockIcon,
  },
  {
    name: "Proctor Dashboard",
    description:
      "Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.",
    icon: AxeIcon,
  },
  {
    name: "Setup/Configure Exam Type",
    description:
      "Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.",
    icon: ArrowBigUp,
  },
  {
    name: "Analytics and Reporting",
    description:
      "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    icon: Fingerprint,
  },
  {
    name: "Cheating Prevention",
    description: "Yoo MAloo Has to add respective icons",
    icon: ArrowBigUp,
  },
  {
    name: "Technical Support",
    description: "YooMAloo Has to add respective icons",
    icon: ArrowBigUp,
  },
  {
    name: "Secure Environment",
    description: "YooMAloo Has to add respective icons",
    icon: ArrowBigUp,
  },
];

export const FeatureSection = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          {/* <h2 className="text-base font-semibold leading-7 text-primary">
            Smart. Secure. Monitor. 
          </h2> */}
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ultimate guardianship of the CSI realm.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Code Shield India(CSI) provides seamless proctored examination
            experience for organizers and candidates altogether. With vast
            features in the hand of organization we maintain high standards of
            integrity fortified by intelligent and manual surveillance.<br></br>
            Explore some of our cutting edge features like specification guided administrators,
            choosing examination type, providing technical support, data
            security and so much more.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
