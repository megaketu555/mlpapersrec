"use client"

import { useState, useMemo } from "react"
import { ExternalLink, BookOpen, Cpu, Database, Brain, Calculator, LinkIcon, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Paper {
  title: string
  authors: string
  year: number
  category: string
  arxivId?: string
  doi?: string
  description?: string
}

const papers: Paper[] = [
  // Distributed Computing
  {
    title: "MapReduce: Simplified Data Processing on Large Clusters",
    authors: "Dean & Ghemawat",
    year: 2004,
    category: "Distributed Computing",
    description: "Foundational paper on distributed data processing",
  },
  {
    title: "The Google File System",
    authors: "Ghemawat, Gobioff, Leung",
    year: 2003,
    category: "Distributed Computing",
    description: "Scalable distributed file system design",
  },
  {
    title: "Time, Clocks, and the Ordering of Events in a Distributed System",
    authors: "Leslie Lamport",
    year: 1978,
    category: "Distributed Computing",
    description: "Fundamental concepts of distributed system ordering",
  },
  {
    title: "Viewstamped Replication: A New Primary Copy Method",
    authors: "Oki & Liskov",
    year: 1988,
    category: "Distributed Computing",
    description: "Early consensus algorithm for distributed systems",
  },
  {
    title: "Paxos Made Simple",
    authors: "Leslie Lamport",
    year: 2001,
    category: "Distributed Computing",
    arxivId: "1501.05049",
    description: "Simplified explanation of the Paxos consensus algorithm",
  },
  {
    title: "Raft: In Search of an Understandable Consensus Algorithm",
    authors: "Ongaro & Ousterhout",
    year: 2014,
    category: "Distributed Computing",
    arxivId: "1309.5671",
    description: "More understandable alternative to Paxos",
  },
  {
    title: "Dynamo: Amazon's Highly Available Key-value Store",
    authors: "DeCandia et al.",
    year: 2007,
    category: "Distributed Computing",
    description: "Eventually consistent distributed storage system",
  },
  {
    title: "Spanner: Google's Globally-Distributed Database",
    authors: "Corbett et al.",
    year: 2012,
    category: "Distributed Computing",
    description: "Globally distributed database with strong consistency",
  },
  {
    title: "Virtual Time and Global States of Distributed Systems",
    authors: "Mattern",
    year: 1989,
    category: "Distributed Computing",
    description: "Vector clocks and distributed system state",
  },
  {
    title: 'CAP Twelve Years Later: How the "Rules" Have Changed',
    authors: "Brewer",
    year: 2012,
    category: "Distributed Computing",
    description: "Evolution of the CAP theorem understanding",
  },

  // Blockchain
  {
    title: "Bitcoin: A Peer-to-Peer Electronic Cash System",
    authors: "Satoshi Nakamoto",
    year: 2008,
    category: "Blockchain",
    description: "The original Bitcoin whitepaper",
  },
  {
    title: "Ethereum: A Secure Decentralised Generalised Transaction Ledger",
    authors: "Buterin et al.",
    year: 2014,
    category: "Blockchain",
    description: "Smart contract platform design",
  },
  {
    title: "On the Security and Performance of Proof of Work Blockchains",
    authors: "Gervais et al.",
    year: 2016,
    category: "Blockchain",
    arxivId: "1603.09422",
    description: "Analysis of PoW blockchain security",
  },
  {
    title: "Algorand: Scaling Byzantine Agreements for Cryptocurrencies",
    authors: "Gilad et al.",
    year: 2017,
    category: "Blockchain",
    arxivId: "1607.01341",
    description: "Pure proof-of-stake consensus mechanism",
  },
  {
    title: "Hawk: The Blockchain Model of Cryptography and Privacy-Preserving Smart Contracts",
    authors: "Kosba et al.",
    year: 2016,
    category: "Blockchain",
    arxivId: "1411.3332",
    description: "Privacy-preserving smart contracts",
  },
  {
    title: "The Sybil Attack",
    authors: "Douceur",
    year: 2002,
    category: "Blockchain",
    description: "Fundamental attack on peer-to-peer networks",
  },
  {
    title: "Ouroboros: A Provably Secure Proof-of-Stake Blockchain Protocol",
    authors: "Kiayias et al.",
    year: 2017,
    category: "Blockchain",
    arxivId: "1707.05465",
    description: "Provably secure PoS protocol",
  },
  {
    title: "Chainlink: A Decentralized Oracle Network",
    authors: "Ellis, Juels, Nazarov",
    year: 2017,
    category: "Blockchain",
    description: "Decentralized oracle problem solution",
  },
  {
    title: "The Libra Blockchain",
    authors: "Facebook (Meta)",
    year: 2019,
    category: "Blockchain",
    description: "Permissioned blockchain for digital currency",
  },
  {
    title: "Flash Boys 2.0: Frontrunning, Transaction Reordering, and Consensus Instability in DeFi",
    authors: "Daian et al.",
    year: 2020,
    category: "Blockchain",
    arxivId: "1904.05234",
    description: "MEV and transaction ordering in DeFi",
  },

  // Database Design
  {
    title: "The Entity-Relationship Model: Toward a Unified View of Data",
    authors: "Peter Chen",
    year: 1976,
    category: "Database Design",
    description: "Foundational data modeling approach",
  },
  {
    title: "A Relational Model of Data for Large Shared Data Banks",
    authors: "E. F. Codd",
    year: 1970,
    category: "Database Design",
    description: "The birth of relational databases",
  },
  {
    title: "The Architecture of a Database System",
    authors: "Hellerstein, Stonebraker, Hamilton",
    year: 2007,
    category: "Database Design",
    description: "Comprehensive database system architecture",
  },
  {
    title: "Bigtable: A Distributed Storage System for Structured Data",
    authors: "Chang et al.",
    year: 2006,
    category: "Database Design",
    description: "Google's distributed storage system",
  },
  {
    title: "F1 - The Fault-Tolerant Distributed RDBMS Supporting Google's Ad Business",
    authors: "Shute et al.",
    year: 2013,
    category: "Database Design",
    description: "Distributed SQL database at scale",
  },
  {
    title: "Latches vs. Locks: Database Concurrency in the Multicore Era",
    authors: "Yu et al.",
    year: 2014,
    category: "Database Design",
    description: "Modern database concurrency control",
  },
  {
    title: "OLTP Through the Looking Glass, and What We Found There",
    authors: "Harizopoulos et al.",
    year: 2008,
    category: "Database Design",
    description: "Analysis of OLTP system performance",
  },
  {
    title: "CALM and Consistency",
    authors: "Hellerstein",
    year: 2010,
    category: "Database Design",
    description: "Consistency and logical monotonicity",
  },
  {
    title: "The End of an Architectural Era (It's Time for a Complete Rewrite)",
    authors: "Stonebraker et al.",
    year: 2007,
    category: "Database Design",
    description: "Critique of traditional database architectures",
  },
  {
    title: "PACELC: Beyond CAP",
    authors: "Daniel Abadi",
    year: 2012,
    category: "Database Design",
    description: "Extension of the CAP theorem",
  },

  // Theoretical Computer Science
  {
    title: "On Computable Numbers, with an Application to the Entscheidungsproblem",
    authors: "Alan Turing",
    year: 1936,
    category: "Theoretical Computer Science",
    description: "Foundation of computation theory",
  },
  {
    title: "A Mathematical Theory of Communication",
    authors: "Claude Shannon",
    year: 1948,
    category: "Theoretical Computer Science",
    description: "Birth of information theory",
  },
  {
    title: "The Complexity of Theorem-Proving Procedures",
    authors: "Stephen Cook",
    year: 1971,
    category: "Theoretical Computer Science",
    description: "Cook's theorem and NP-completeness",
  },
  {
    title: "Reducibility Among Combinatorial Problems",
    authors: "Richard Karp",
    year: 1972,
    category: "Theoretical Computer Science",
    description: "21 NP-complete problems",
  },
  {
    title: "Time Bounds for Selection",
    authors: "Blum et al.",
    year: 1973,
    category: "Theoretical Computer Science",
    description: "Linear time selection algorithm",
  },
  {
    title: "Interactive Proofs and the Hardness of Approximating Cliques",
    authors: "Feige et al.",
    year: 1996,
    category: "Theoretical Computer Science",
    description: "Interactive proofs and approximation hardness",
  },
  {
    title: "Probabilistic Checking of Proofs and the Hardness of Approximation Problems",
    authors: "Arora et al.",
    year: 1998,
    category: "Theoretical Computer Science",
    description: "PCP theorem and its implications",
  },
  {
    title: "The Complexity of Theorem-Proving Procedures (DPLL)",
    authors: "Davis, Putnam, Logemann, Loveland",
    year: 1962,
    category: "Theoretical Computer Science",
    description: "DPLL algorithm for SAT solving",
  },
  {
    title: "The Art of Multiprocessor Programming",
    authors: "Maurice Herlihy and Nir Shavit",
    year: 2008,
    category: "Theoretical Computer Science",
    description: "Concurrent programming principles",
  },
  {
    title: "The Lambda Calculus",
    authors: "Alonzo Church",
    year: 1936,
    category: "Theoretical Computer Science",
    description: "Foundation of functional programming",
  },

  // Deep Learning
  {
    title: "ImageNet Classification with Deep Convolutional Neural Networks (AlexNet)",
    authors: "Krizhevsky, Sutskever, Hinton",
    year: 2012,
    category: "Deep Learning",
    arxivId: "1404.5997",
    description: "Breakthrough in deep learning for computer vision",
  },
  {
    title: "Deep Residual Learning for Image Recognition (ResNet)",
    authors: "He et al.",
    year: 2015,
    category: "Deep Learning",
    arxivId: "1512.03385",
    description: "Residual connections for very deep networks",
  },
  {
    title: "Attention is All You Need (Transformers)",
    authors: "Vaswani et al.",
    year: 2017,
    category: "Deep Learning",
    arxivId: "1706.03762",
    description: "Transformer architecture revolutionizing NLP",
  },
  {
    title: "Auto-Encoding Variational Bayes (VAE)",
    authors: "Kingma & Welling",
    year: 2013,
    category: "Deep Learning",
    arxivId: "1312.6114",
    description: "Variational autoencoders for generative modeling",
  },
  {
    title: "Generative Adversarial Nets (GANs)",
    authors: "Goodfellow et al.",
    year: 2014,
    category: "Deep Learning",
    arxivId: "1406.2661",
    description: "Adversarial training for generative models",
  },
  {
    title: "Distilling the Knowledge in a Neural Network",
    authors: "Hinton et al.",
    year: 2015,
    category: "Deep Learning",
    arxivId: "1503.02531",
    description: "Knowledge distillation from teacher to student networks",
  },
  {
    title: "Learning Deep Representations by Mutual Information Estimation and Maximization",
    authors: "Hjelm et al.",
    year: 2018,
    category: "Deep Learning",
    arxivId: "1808.06670",
    description: "Self-supervised learning through mutual information",
  },
  {
    title: "YOLO: Real-Time Object Detection",
    authors: "Redmon et al.",
    year: 2016,
    category: "Deep Learning",
    arxivId: "1506.02640",
    description: "You Only Look Once object detection",
  },
  {
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    authors: "Devlin et al.",
    year: 2018,
    category: "Deep Learning",
    arxivId: "1810.04805",
    description: "Bidirectional encoder representations from transformers",
  },
  {
    title: "Language Models are Few-Shot Learners (GPT-3)",
    authors: "Brown et al. (OpenAI)",
    year: 2020,
    category: "Deep Learning",
    arxivId: "2005.14165",
    description: "Large language models and in-context learning",
  },

  // Matrix Computation & Numerical Linear Algebra
  {
    title: "The Singular Value Decomposition and Least Squares Solutions",
    authors: "Golub & Reinsch",
    year: 1970,
    category: "Matrix Computation",
    description: "SVD algorithm and applications",
  },
  {
    title: "An Iterative Method for the Solution of the Eigenvalue Problem",
    authors: "Lanczos",
    year: 1950,
    category: "Matrix Computation",
    description: "Lanczos algorithm for eigenvalue problems",
  },
  {
    title: "A Class of Algorithms for Computing Eigenvalues and Eigenvectors",
    authors: "David S. Watkins",
    year: 1982,
    category: "Matrix Computation",
    description: "Modern eigenvalue computation methods",
  },
  {
    title: "The QR Algorithm for Computing Eigenvalues",
    authors: "Francis",
    year: 1961,
    category: "Matrix Computation",
    description: "QR algorithm for eigenvalue decomposition",
  },
  {
    title: "Mixed Precision Training",
    authors: "Micikevicius et al.",
    year: 2018,
    category: "Matrix Computation",
    arxivId: "1710.03740",
    description: "Efficient training with reduced precision",
  },
  {
    title: "On the Convergence of Krylov Subspace Methods",
    authors: "Saad",
    year: 1996,
    category: "Matrix Computation",
    description: "Analysis of iterative linear algebra methods",
  },
  {
    title: "Tensor Decompositions and Applications",
    authors: "Tamara Kolda & Brett Bader",
    year: 2009,
    category: "Matrix Computation",
    description: "Comprehensive survey of tensor methods",
  },
  {
    title: "Randomized Algorithms for Matrices and Data",
    authors: "Mahoney",
    year: 2011,
    category: "Matrix Computation",
    arxivId: "1104.5557",
    description: "Randomized numerical linear algebra",
  },
  {
    title: "The Power Method for Dominant Eigenvalue Approximation",
    authors: "Various (Classical)",
    year: 1929,
    category: "Matrix Computation",
    description: "Classical iterative eigenvalue method",
  },
  {
    title: "Fast Johnson-Lindenstrauss Embeddings",
    authors: "Ailon & Chazelle",
    year: 2009,
    category: "Matrix Computation",
    description: "Efficient dimensionality reduction",
  },
]

const categories = [
  { name: "Distributed Computing", icon: Cpu, color: "bg-blue-500" },
  { name: "Blockchain", icon: LinkIcon, color: "bg-purple-500" },
  { name: "Database Design", icon: Database, color: "bg-green-500" },
  { name: "Theoretical Computer Science", icon: BookOpen, color: "bg-orange-500" },
  { name: "Deep Learning", icon: Brain, color: "bg-red-500" },
  { name: "Matrix Computation", icon: Calculator, color: "bg-cyan-500" },
]

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
      const matchesCategory = !selectedCategory || paper.category === selectedCategory
      return matchesCategory
    })
  }, [selectedCategory])

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName)
    return category ? category.icon : BookOpen
  }

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName)
    return category ? category.color : "bg-gray-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-yellow-400/5 to-emerald-500/5 rounded-full blur-2xl" />
          </div>
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-emerald-400 bg-clip-text text-transparent">
                Essential
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-yellow-400 bg-clip-text text-transparent">
                Papers
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-emerald-500 mx-auto rounded-full mb-8" />
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            A curated collection of <span className="text-yellow-400 font-semibold">foundational papers</span> in
            computer science, machine learning, and{" "}
            <span className="text-emerald-400 font-semibold">distributed systems</span>
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">60</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Papers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">6</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Categories</div>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-emerald-500 bg-clip-text text-transparent mb-2">
                ∞
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Knowledge</div>
            </div>
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.name
                      ? "bg-gradient-to-r from-yellow-400 to-emerald-500 text-black hover:from-yellow-300 hover:to-emerald-400 border-0"
                      : "border-gray-600 text-gray-300 hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-emerald-500/10 hover:border-yellow-400/50 bg-transparent"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </Button>
              )
            })}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gradient-to-b from-yellow-400 to-emerald-500 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Papers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPapers.map((paper, index) => {
            const Icon = getCategoryIcon(paper.category)
            return (
              <Card
                key={index}
                className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 hover:border-yellow-400/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/10"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-white leading-tight mb-2">{paper.title}</CardTitle>
                      <CardDescription className="text-gray-300 font-medium">
                        {paper.authors} • {paper.year}
                      </CardDescription>
                    </div>
                    <div className={`p-2 rounded-lg ${getCategoryColor(paper.category)}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <Badge variant="secondary" className="bg-gray-700 text-gray-200">
                      {paper.category}
                    </Badge>
                    {paper.description && <p className="text-sm text-gray-400 leading-relaxed">{paper.description}</p>}
                    <div className="flex gap-2 pt-2">
                      {paper.arxivId && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                        >
                          <a
                            href={`https://arxiv.org/abs/${paper.arxivId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            arXiv
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                      >
                        <a
                          href={`https://scholar.google.com/scholar?q=${encodeURIComponent(paper.title + " " + paper.authors)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          <Search className="w-3 h-3" />
                          Scholar
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No papers found</h3>
            <p className="text-gray-500">Try adjusting your search terms or category filter</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p className="mb-2">
              Curated collection of {papers.length} essential papers across {categories.length} categories
            </p>
            <p className="text-sm">Links to arXiv where available • Use Google Scholar for papers not on arXiv</p>
          </div>
        </div>
      </footer>

      {/* Glassy Floater */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-6 py-3 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
          <p className="text-sm font-medium text-white/90 flex items-center gap-2">
            Made with <span className="text-red-400 animate-pulse">❤️</span> by{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-emerald-400 bg-clip-text text-transparent font-bold">
              Megaketu
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
