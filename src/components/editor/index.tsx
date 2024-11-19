import { useRef } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

const CustomEditor: React.FC<
  ReactQuillProps & {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  }
> = ({ value, setValue, ...props }) => {
  //   const [value, setValue] = useState(`
  //     <h1>The Art of Mindful Living: Finding Peace in a Fast-Paced World</h1>
  //     <br />
  // <p>In today’s world, life often feels like it’s moving at lightning speed. With responsibilities piling up, endless notifications vying for our attention, and the pressure to stay ahead, it’s no wonder many of us feel overwhelmed. In this whirlwind, one practice has proven to be a powerful antidote to stress: <strong>mindful living</strong>.</p>

  // <br/>

  // <h2>What is Mindfulness?</h2>

  // <p>Mindfulness is the art of being fully present in the moment, aware of where we are, what we’re doing, and how we’re feeling. It’s about observing without judgment, simply noticing our thoughts and emotions as they come and go. Practicing mindfulness can help us reconnect with ourselves and the world around us, bringing a sense of calm and clarity to our lives.</p>
  // <br />

  // <h2>Benefits of Mindful Living</h2>

  // <p>The practice of mindfulness offers a wealth of benefits for our mental, physical, and emotional well-being. Here are just a few:</p>

  // <ol>
  //   <li><strong>Reduced Stress</strong>: Studies have shown that mindfulness can significantly reduce levels of stress. By focusing on the present moment, we can let go of worries about the past and future.</li>
  //   <li><strong>Improved Focus</strong>: Practicing mindfulness can improve concentration and mental clarity, making it easier to stay focused on tasks.</li>
  //   <li><strong>Enhanced Emotional Resilience</strong>: Mindfulness helps us to respond to situations calmly, rather than reacting impulsively, which builds emotional resilience over time.</li>
  //   <li><strong>Better Physical Health</strong>: Mindful practices, such as meditation, have been linked to lower blood pressure, improved immune function, and reduced symptoms of chronic pain.</li>
  // </ol>
  // <br />

  // <h2>Simple Ways to Start Living Mindfully</h2>

  // <p>Here are a few practical tips to incorporate mindfulness into your daily routine:</p>

  // <h3>1. Start Your Day with a Moment of Stillness</h3>

  // <p>Before jumping out of bed, take a few moments to just breathe. Feel the weight of your body on the bed, notice your breathing, and set an intention for the day ahead. This small ritual can set a calm tone for the rest of the day.</p>

  // <h3>2. Practice Deep Breathing</h3>

  // <p>Whenever you’re feeling overwhelmed, take a few deep breaths. Try this simple technique: inhale deeply for a count of four, hold for a count of four, and exhale slowly for a count of six. This helps activate your body’s relaxation response, making it easier to stay grounded.</p>

  // <h3>3. Mindful Eating</h3>

  // <p>When you eat, try to really savor the flavors, textures, and aromas of your food. Put away distractions like your phone or TV, and focus on each bite. Eating mindfully can enhance your enjoyment of food and improve digestion.</p>

  // <h3>4. Single-Tasking</h3>

  // <p>Instead of juggling multiple tasks at once, try focusing on one thing at a time. Whether it’s writing an email or having a conversation, give it your full attention. Single-tasking can reduce stress and improve the quality of your work.</p>

  // <br />

  // <h2>Closing Thoughts</h2>

  // <p>Mindful living isn’t about changing who you are; it’s about cultivating a deeper awareness of each moment. By learning to live in the present, you can build a life filled with peace, purpose, and joy. So, take a deep breath, be kind to yourself, and embrace the journey of mindful living.</p>

  //     `);
  const ref = useRef<ReactQuill>(null);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      ["link", "image", "video"],
      ["clean"], // remove formatting button
    ],
  };

  return (
    <div className="custom-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        className=" dark:text-white text-gray-800 border-none "
        ref={ref}
        placeholder="Start typing..."
        {...props}
      />
    </div>
  );
};

export default CustomEditor;
