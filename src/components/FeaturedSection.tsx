
import { ArrowRight } from 'lucide-react';

const FeaturedSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Feature 1 */}
          <div className="flex-1 group">
            <div className="relative overflow-hidden rounded-2xl h-[600px]">
              <img 
                src="https://images.unsplash.com/photo-1620812097331-ff636155488f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Organic Collection" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                <span className="text-white/80 text-sm font-medium mb-2">Featured</span>
                <h3 className="text-white text-2xl font-semibold mb-2">Organic Collection</h3>
                <p className="text-white/80 mb-6 max-w-md">
                  Made with 100% organic cotton for a natural and eco-friendly bathing experience.
                </p>
                <button className="text-white inline-flex items-center group/btn">
                  <span className="border-b border-white/30 group-hover/btn:border-white transition-colors">
                    Shop Collection
                  </span>
                  <ArrowRight className="ml-2 transition-transform group-hover/btn:translate-x-1" size={16} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-8">
            {/* Feature 2 */}
            <div className="flex-1 group">
              <div className="relative overflow-hidden rounded-2xl h-[280px]">
                <img 
                  src="https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Premium Hand Towels" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-white text-xl font-semibold mb-2">Premium Hand Towels</h3>
                  <button className="text-white inline-flex items-center group/btn">
                    <span className="border-b border-white/30 group-hover/btn:border-white transition-colors">
                      Explore
                    </span>
                    <ArrowRight className="ml-2 transition-transform group-hover/btn:translate-x-1" size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="flex-1 group">
              <div className="relative overflow-hidden rounded-2xl h-[280px]">
                <img 
                  src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Custom Designs" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-white text-xl font-semibold mb-2">Custom Designs</h3>
                  <button className="text-white inline-flex items-center group/btn">
                    <span className="border-b border-white/30 group-hover/btn:border-white transition-colors">
                      Create Your Own
                    </span>
                    <ArrowRight className="ml-2 transition-transform group-hover/btn:translate-x-1" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
