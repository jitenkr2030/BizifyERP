'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Share2, BarChart3, Users, TrendingUp, Search, Plus, Filter, Download, MessageSquare, Heart, Eye, Click, DollarSign } from 'lucide-react';

interface SocialAccount {
  id: string;
  name: string;
  platform: string;
  accountId: string;
  accountType: string;
  username?: string;
  profileImage?: string;
  isActive: boolean;
  connectedAt?: string;
  followerCount: number;
  followingCount: number;
  engagementRate: number;
  createdAt: string;
}

interface SocialPost {
  id: string;
  accountId: string;
  content: string;
  mediaUrls?: string;
  mediaType?: string;
  postType: string;
  status: string;
  scheduledAt?: string;
  publishedAt?: string;
  platform: string;
  hashtags?: string;
  mentions?: string;
  location?: string;
  createdAt: string;
  account?: SocialAccount;
  campaign?: any;
  socialMetrics?: any[];
  _count?: {
    socialComments: number;
    socialInteractions: number;
  };
}

interface SocialCampaign {
  id: string;
  name: string;
  description?: string;
  objective: string;
  startDate: string;
  endDate: string;
  budget: number;
  actualSpend: number;
  status: string;
  platform: string;
  account?: SocialAccount;
  createdAt: string;
}

interface SocialAnalytics {
  metrics: any[];
  aggregated: any;
  platformMetrics: any[];
}

export default function SocialMediaPage() {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [campaigns, setCampaigns] = useState<SocialCampaign[]>([]);
  const [analytics, setAnalytics] = useState<SocialAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Form states
  const [showAccountDialog, setShowAccountDialog] = useState(false);
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [showCampaignDialog, setShowCampaignDialog] = useState(false);

  // Form data
  const [accountForm, setAccountForm] = useState({
    name: '',
    platform: '',
    accountId: '',
    accountType: '',
    username: '',
    isActive: true,
  });

  const [postForm, setPostForm] = useState({
    accountId: '',
    content: '',
    platform: '',
    scheduledAt: '',
    hashtags: '',
    mentions: '',
    location: '',
  });

  const [campaignForm, setCampaignForm] = useState({
    name: '',
    description: '',
    objective: '',
    startDate: '',
    endDate: '',
    budget: 0,
    platform: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [accRes, postRes, campaignRes, analyticsRes] = await Promise.all([
        fetch('/api/social-media/accounts'),
        fetch('/api/social-media/posts'),
        fetch('/api/social-media/campaigns'),
        fetch('/api/social-media/analytics'),
      ]);

      const [accData, postData, campaignData, analyticsData] = await Promise.all([
        accRes.json(),
        postRes.json(),
        campaignRes.json(),
        analyticsRes.json(),
      ]);

      setAccounts(accData.accounts || []);
      setPosts(postData.posts || []);
      setCampaigns(campaignData.campaigns || []);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    try {
      const response = await fetch('/api/social-media/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accountForm),
      });

      if (response.ok) {
        setShowAccountDialog(false);
        setAccountForm({
          name: '',
          platform: '',
          accountId: '',
          accountType: '',
          username: '',
          isActive: true,
        });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  const handleCreatePost = async () => {
    try {
      const response = await fetch('/api/social-media/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postForm),
      });

      if (response.ok) {
        setShowPostDialog(false);
        setPostForm({
          accountId: '',
          content: '',
          platform: '',
          scheduledAt: '',
          hashtags: '',
          mentions: '',
          location: '',
        });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleCreateCampaign = async () => {
    try {
      const response = await fetch('/api/social-media/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignForm),
      });

      if (response.ok) {
        setShowCampaignDialog(false);
        setCampaignForm({
          name: '',
          description: '',
          objective: '',
          startDate: '',
          endDate: '',
          budget: 0,
          platform: '',
        });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'published':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'draft':
      case 'pending':
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'paused':
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      case 'failed':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return '📘';
      case 'twitter':
        return '🐦';
      case 'instagram':
        return '📷';
      case 'linkedin':
        return '💼';
      case 'tiktok':
        return '🎵';
      case 'youtube':
        return '📺';
      case 'pinterest':
        return '📌';
      default:
        return '📱';
    }
  };

  const filteredData = (data: any[]) => {
    return data.filter(item => {
      const matchesSearch = searchTerm === '' || 
        Object.values(item).some(value => 
          typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesPlatform = filterPlatform === 'all' || item.platform === filterPlatform;
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      return matchesSearch && matchesPlatform && matchesStatus;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Social Media Management</h1>
          <p className="text-muted-foreground">
            Manage your social media presence, campaigns, and analytics in one place
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Accounts</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.filter(a => a.isActive).length}</div>
            <p className="text-xs text-muted-foreground">
              Total: {accounts.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {accounts.reduce((acc, account) => acc + account.followerCount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all platforms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Posts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.filter(p => p.status === 'Scheduled').length}</div>
            <p className="text-xs text-muted-foreground">
              Ready to publish
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.filter(c => c.status === 'Active').length}</div>
            <p className="text-xs text-muted-foreground">
              Total Budget: ${campaigns.reduce((acc, c) => acc + c.budget, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search across all modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterPlatform} onValueChange={setFilterPlatform}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="Facebook">Facebook</SelectItem>
            <SelectItem value="Twitter">Twitter</SelectItem>
            <SelectItem value="Instagram">Instagram</SelectItem>
            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
            <SelectItem value="TikTok">TikTok</SelectItem>
            <SelectItem value="YouTube">YouTube</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
            <SelectItem value="Paused">Paused</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="accounts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Accounts Tab */}
        <TabsContent value="accounts" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Social Accounts</h2>
            <Dialog open={showAccountDialog} onOpenChange={setShowAccountDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Connect Account
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Connect Social Account</DialogTitle>
                  <DialogDescription>
                    Add a new social media account to manage
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input
                      id="accountName"
                      value={accountForm.name}
                      onChange={(e) => setAccountForm({ ...accountForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <Select onValueChange={(value) => setAccountForm({ ...accountForm, platform: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="Twitter">Twitter</SelectItem>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="TikTok">TikTok</SelectItem>
                        <SelectItem value="YouTube">YouTube</SelectItem>
                        <SelectItem value="Pinterest">Pinterest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="accountId">Account ID</Label>
                    <Input
                      id="accountId"
                      value={accountForm.accountId}
                      onChange={(e) => setAccountForm({ ...accountForm, accountId: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountType">Account Type</Label>
                    <Select onValueChange={(value) => setAccountForm({ ...accountForm, accountType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Profile">Profile</SelectItem>
                        <SelectItem value="Page">Page</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Creator">Creator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={accountForm.username}
                      onChange={(e) => setAccountForm({ ...accountForm, username: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateAccount}>Connect Account</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {filteredData(accounts).map((account) => (
              <Card key={account.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getPlatformIcon(account.platform)}</div>
                      <div>
                        <CardTitle className="text-lg">{account.name}</CardTitle>
                        <CardDescription>{account.platform} • @{account.username}</CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={account.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {account.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Followers:</span>
                      <p className="text-muted-foreground">{account.followerCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="font-medium">Following:</span>
                      <p className="text-muted-foreground">{account.followingCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="font-medium">Engagement:</span>
                      <p className="text-muted-foreground">{account.engagementRate.toFixed(1)}%</p>
                    </div>
                    <div>
                      <span className="font-medium">Connected:</span>
                      <p className="text-muted-foreground">
                        {account.connectedAt ? new Date(account.connectedAt).toLocaleDateString() : 'Never'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Posts Tab */}
        <TabsContent value="posts" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Social Posts</h2>
            <Dialog open={showPostDialog} onOpenChange={setShowPostDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                  <DialogDescription>
                    Create a new social media post
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="postAccount">Account</Label>
                      <Select onValueChange={(value) => setPostForm({ ...postForm, accountId: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.map((account) => (
                            <SelectItem key={account.id} value={account.id}>
                              {account.name} ({account.platform})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="postPlatform">Platform</Label>
                      <Select onValueChange={(value) => setPostForm({ ...postForm, platform: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Facebook">Facebook</SelectItem>
                          <SelectItem value="Twitter">Twitter</SelectItem>
                          <SelectItem value="Instagram">Instagram</SelectItem>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                          <SelectItem value="TikTok">TikTok</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="postContent">Content</Label>
                    <Textarea
                      id="postContent"
                      value={postForm.content}
                      onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                      placeholder="What would you like to share?"
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="scheduledAt">Schedule For</Label>
                      <Input
                        id="scheduledAt"
                        type="datetime-local"
                        value={postForm.scheduledAt}
                        onChange={(e) => setPostForm({ ...postForm, scheduledAt: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={postForm.location}
                        onChange={(e) => setPostForm({ ...postForm, location: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hashtags">Hashtags</Label>
                      <Input
                        id="hashtags"
                        value={postForm.hashtags}
                        onChange={(e) => setPostForm({ ...postForm, hashtags: e.target.value })}
                        placeholder="#hashtag1 #hashtag2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mentions">Mentions</Label>
                      <Input
                        id="mentions"
                        value={postForm.mentions}
                        onChange={(e) => setPostForm({ ...postForm, mentions: e.target.value })}
                        placeholder="@user1 @user2"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreatePost}>Create Post</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {filteredData(posts).map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getPlatformIcon(post.platform)}</div>
                      <div>
                        <CardTitle className="text-lg">{post.account?.name || 'Unknown Account'}</CardTitle>
                        <CardDescription>{post.platform} • {post.postType}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(post.status)}>
                      {post.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm">{post.content}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>{post._count?.socialInteractions || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        <span>{post._count?.socialComments || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-green-500" />
                        <span>{post.socialMetrics?.[0]?.impressions || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Click className="h-4 w-4 text-purple-500" />
                        <span>{post.socialMetrics?.[0]?.clicks || 0}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Scheduled:</span>
                        <p>{post.scheduledAt ? new Date(post.scheduledAt).toLocaleDateString() : 'Not scheduled'}</p>
                      </div>
                      <div>
                        <span className="font-medium">Published:</span>
                        <p>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Not published'}</p>
                      </div>
                      <div>
                        <span className="font-medium">Campaign:</span>
                        <p>{post.campaign?.name || 'No campaign'}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Campaigns</h2>
            <Dialog open={showCampaignDialog} onOpenChange={setShowCampaignDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Campaign</DialogTitle>
                  <DialogDescription>
                    Create a new social media campaign
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="campaignName">Campaign Name</Label>
                      <Input
                        id="campaignName"
                        value={campaignForm.name}
                        onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="campaignPlatform">Platform</Label>
                      <Select onValueChange={(value) => setCampaignForm({ ...campaignForm, platform: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Facebook">Facebook</SelectItem>
                          <SelectItem value="Instagram">Instagram</SelectItem>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                          <SelectItem value="Twitter">Twitter</SelectItem>
                          <SelectItem value="TikTok">TikTok</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="campaignDescription">Description</Label>
                    <Textarea
                      id="campaignDescription"
                      value={campaignForm.description}
                      onChange={(e) => setCampaignForm({ ...campaignForm, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="campaignObjective">Objective</Label>
                    <Select onValueChange={(value) => setCampaignForm({ ...campaignForm, objective: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select objective" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Brand Awareness">Brand Awareness</SelectItem>
                        <SelectItem value="Lead Generation">Lead Generation</SelectItem>
                        <SelectItem value="Traffic">Traffic</SelectItem>
                        <SelectItem value="Conversions">Conversions</SelectItem>
                        <SelectItem value="Engagement">Engagement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={campaignForm.startDate}
                        onChange={(e) => setCampaignForm({ ...campaignForm, startDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={campaignForm.endDate}
                        onChange={(e) => setCampaignForm({ ...campaignForm, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget ($)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={campaignForm.budget}
                      onChange={(e) => setCampaignForm({ ...campaignForm, budget: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateCampaign}>Create Campaign</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {filteredData(campaigns).map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getPlatformIcon(campaign.platform)}</div>
                      <div>
                        <CardTitle className="text-lg">{campaign.name}</CardTitle>
                        <CardDescription>{campaign.platform} • {campaign.objective}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Budget:</span>
                      <p className="text-muted-foreground">${campaign.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="font-medium">Spent:</span>
                      <p className="text-muted-foreground">${campaign.actualSpend.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="font-medium">Start Date:</span>
                      <p className="text-muted-foreground">{new Date(campaign.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="font-medium">End Date:</span>
                      <p className="text-muted-foreground">{new Date(campaign.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {campaign.description && (
                    <div className="mt-4">
                      <span className="font-medium">Description:</span>
                      <p className="text-muted-foreground mt-1">{campaign.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Analytics & Insights</h2>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Analytics
            </Button>
          </div>

          {analytics && (
            <div className="space-y-6">
              {/* Platform Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Performance Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.platformMetrics.map((platform: any) => (
                      <div key={platform.platform} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{getPlatformIcon(platform.platform)}</div>
                          <div>
                            <h3 className="font-semibold">{platform.platform}</h3>
                            <p className="text-sm text-muted-foreground">{platform.count} metrics</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-right">
                          <div>
                            <div className="font-semibold">{platform.impressions.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Impressions</div>
                          </div>
                          <div>
                            <div className="font-semibold">{platform.engagementRate.toFixed(1)}%</div>
                            <div className="text-xs text-muted-foreground">Engagement</div>
                          </div>
                          <div>
                            <div className="font-semibold">${platform.spend.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Spend</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">
                        {analytics.aggregated.avgReachRate?.toFixed(1) || 0}%
                      </div>
                      <div className="text-sm text-muted-foreground">Average Reach Rate</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-green-600">
                        {analytics.aggregated.avgClickThroughRate?.toFixed(1) || 0}%
                      </div>
                      <div className="text-sm text-muted-foreground">Click-Through Rate</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">
                        ${analytics.aggregated.avgCostPerClick?.toFixed(2) || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Cost Per Click</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ROI Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Return on Investment Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center p-6 border rounded-lg">
                      <div className="text-4xl font-bold text-teal-600">
                        {analytics.aggregated.avgROI?.toFixed(1) || 0}%
                      </div>
                      <div className="text-lg text-muted-foreground">Average ROI</div>
                      <div className="text-sm text-muted-foreground mt-2">
                        Revenue: ${analytics.aggregated.totalRevenue?.toLocaleString() || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Spend: ${analytics.aggregated.totalSpend?.toLocaleString() || 0}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Total Revenue</span>
                        <span className="font-semibold">${analytics.aggregated.totalRevenue?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total Spend</span>
                        <span className="font-semibold">${analytics.aggregated.totalSpend?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Net Profit</span>
                        <span className="font-semibold">
                          ${((analytics.aggregated.totalRevenue || 0) - (analytics.aggregated.totalSpend || 0)).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Conversion Rate</span>
                        <span className="font-semibold">{analytics.aggregated.avgConversionRate?.toFixed(1) || 0}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}